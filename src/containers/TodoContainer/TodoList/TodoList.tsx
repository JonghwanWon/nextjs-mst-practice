import { FC } from 'react';
import styled from 'styled-components';

import { InjectedStoreProps, pluggedIn } from '~/helpers/mobx';

import EmptyList from './EmptyList';
import TodoItem from './TodoItem';

const Container = styled.div``;

type TodoListProps = {} & InjectedStoreProps;

const TodoList: FC<TodoListProps> = ({ store }) => {
  const { todoStore } = store;
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

export default pluggedIn(TodoList);
