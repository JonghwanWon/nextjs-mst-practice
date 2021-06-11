import { FC } from 'react';
import styled from 'styled-components';

import Filter from '~/components/Filter';
import TodoCreator from '~/components/TodoCreator';
import TodoList from '~/components/TodoList';
import { TTodoStore } from '~/stores/TodoStore';

const Container = styled.div``;

type TodoContainerProps = {
  store: TTodoStore;
};

const TodoContainer: FC<TodoContainerProps> = ({ store }) => {
  return (
    <Container>
      <TodoCreator store={store} />
      <Filter store={store} />
      <TodoList store={store} />
    </Container>
  );
};

export default TodoContainer;
