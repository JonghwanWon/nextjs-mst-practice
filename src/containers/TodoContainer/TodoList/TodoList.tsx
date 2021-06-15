import { observer } from 'mobx-react';
import { FC } from 'react';
import styled from 'styled-components';

import { getStore } from '~/stores/init';

import EmptyList from './EmptyList';
import TodoItem from './TodoItem';

const Container = styled.div``;

type TodoListProps = {};

const TodoList: FC<TodoListProps> = ({}) => {
  const todoStore = getStore((stores) => stores.todoStore);
  const { filteredTodos } = todoStore;

  return (
    <Container>
      {filteredTodos.length ? (
        filteredTodos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
      ) : (
        <EmptyList />
      )}
    </Container>
  );
};

export default observer(TodoList);
