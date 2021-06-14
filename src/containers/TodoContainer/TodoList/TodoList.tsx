import { FC } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import styled from 'styled-components';

import { InjectedStoreProps, pluggedIn } from '~/helpers/mobx';
import colors from '~/theme/colors';

const Container = styled.div`
  padding: 24px 0;
`;

const TodoItems = styled.div``;

const TodoItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid ${colors.border};
  margin-bottom: 16px;
  background-color: #fff;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ClearButton = styled.div`
  position: absolute;
  top: 12px;
  right: 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 1px;
    background-color: ${colors.gray700};
    content: '';
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(135deg);
  }
`;

const Status = styled.div`
  margin-right: 4px;
`;

type TDoneIcon = {
  isCompleted: boolean;
};
const DoneIcon = styled.div<TDoneIcon>`
  color: ${({ isCompleted }) =>
    isCompleted ? colors.green400 : colors.gray400};
  cursor: pointer;
`;

const Task = styled.p`
  font-size: 21px;
`;

type TodoListProps = {} & InjectedStoreProps;

const TodoList: FC<TodoListProps> = ({ store }) => {
  const { todoStore } = store;

  return (
    <Container>
      <TodoItems>
        {todoStore.filteredTodos.map((todo) => (
          <TodoItem key={todo.id}>
            <Status onClick={() => todoStore.toggleDone(todo.id)}>
              <DoneIcon isCompleted={todo.done}>
                <MdCheckCircle size={24} />
              </DoneIcon>
            </Status>
            <Task>{todo.task}</Task>
            <ClearButton onClick={() => todoStore.removeTodo(todo.id)} />
          </TodoItem>
        ))}
      </TodoItems>
    </Container>
  );
};

export default pluggedIn(TodoList);
