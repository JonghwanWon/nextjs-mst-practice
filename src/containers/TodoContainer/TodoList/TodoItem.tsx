import { observer } from 'mobx-react';
import { FC, useCallback, useRef, useState } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import styled, { css } from 'styled-components';

import { TodoInstance } from '~/models/Todo';
import { getStore } from '~/stores/init';

import TaskEditor from './TaskEditor';

const ClearButton = styled.div`
  position: absolute;
  top: 26px;
  right: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%);
  transition: all 240ms linear;
  user-select: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.red300};
    content: '';
    transition: background-color 120ms linear;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }

  &:hover::before,
  &:hover::after {
    background-color: ${({ theme }) => theme.colors.red900};
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 4px 24px 4px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: #fff;

  &:last-child {
    border-bottom: none;
  }

  &:hover ${ClearButton} {
    opacity: 1;
    pointer-events: all;
    user-select: all;
  }
`;

const Status = styled.div`
  margin-right: 8px;
`;

type TCompletedIcon = {
  isCompleted: boolean;
};
const CompletedIcon = styled.div<TCompletedIcon>`
  padding-top: 12px;
  color: ${({ theme, isCompleted }) =>
    isCompleted ? theme.colors.green400 : theme.colors.gray400};
  cursor: pointer;
  transition: color 120ms linear;
`;

type TTask = {
  isCompleted: boolean;
};
const Task = styled.p<TTask>(
  ({ theme, isCompleted }) => css`
    padding: 8px 0;
    color: ${isCompleted ? theme.colors.gray400 : theme.colors.gray800};
    font-size: 21px;
    transition: all 120ms linear;
  `,
);

type TodoItemProps = {
  todo: TodoInstance;
};

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const todoStore = getStore((stores) => stores.todoStore);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleCompleted = useCallback(
    (id: string) => () => {
      todoStore.toggleCompleted(id);
    },
    [],
  );

  const handleRemoveTodo = useCallback(
    (id: string) => () => {
      todoStore.removeTodo(id);
    },
    [],
  );

  const handleExitEditMode = () => {
    const { current } = inputRef;

    if (!current) return;

    if (current.value) {
      setIsEdit(false);
      todoStore.changeTask(todo.id, current.value);
    } else {
      alert('내용을 입력해주세요');
      current.focus();
    }
  };

  return (
    <Container>
      <Status onClick={handleToggleCompleted(todo.id)}>
        <CompletedIcon isCompleted={todo.completed}>
          <MdCheckCircle size={24} style={{ display: 'block' }} />
        </CompletedIcon>
      </Status>
      {isEdit ? (
        <TaskEditor
          ref={inputRef}
          task={todo.task}
          onSubmitChange={handleExitEditMode}
        />
      ) : (
        <>
          <Task
            isCompleted={todo.completed}
            onDoubleClick={isEdit ? undefined : () => setIsEdit(true)}
          >
            {todo.task}
          </Task>
          <ClearButton onClick={handleRemoveTodo(todo.id)} />
        </>
      )}
    </Container>
  );
};

export default observer(TodoItem);
