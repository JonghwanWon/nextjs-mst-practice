import { FC } from 'react';
import styled from 'styled-components';

import Footer from '~/containers/TodoContainer/Footer';
import TodoCreator from '~/containers/TodoContainer/TodoCreator';
import TodoList from '~/containers/TodoContainer/TodoList';

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.125), 0 2px 4px rgba(0, 0, 0, 0.0625);
`;

type TodoContainerProps = {};

const TodoContainer: FC<TodoContainerProps> = ({}) => {
  return (
    <Container>
      <TodoCreator />
      <TodoList />
      <Footer />
    </Container>
  );
};

export default TodoContainer;
