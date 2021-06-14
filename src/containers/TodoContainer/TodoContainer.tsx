import { FC } from 'react';
import styled from 'styled-components';

import Filter from '~/containers/TodoContainer/Filter';
import TodoCreator from '~/containers/TodoContainer/TodoCreator';
import TodoList from '~/containers/TodoContainer/TodoList';

const Container = styled.div``;

type TodoContainerProps = {};

const TodoContainer: FC<TodoContainerProps> = ({}) => {
  return (
    <Container>
      <TodoCreator />
      <Filter />
      <TodoList />
    </Container>
  );
};

export default TodoContainer;
