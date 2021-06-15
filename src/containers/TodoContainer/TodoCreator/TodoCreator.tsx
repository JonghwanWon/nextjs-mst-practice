import { useCallback } from 'react';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { InjectedStoreProps, pluggedIn } from '~/helpers/mobx';
import { TTodo } from '~/models/Todo';

const Container = styled.div``;

const StyledForm = styled.form``;

const Row = styled.div`
  display: flex;
  align-items: stretch;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  appearance: none;
  outline: none;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  appearance: none;
  background-color: ${({ theme }) => theme.colors.green400};
  color: #fff;
  font-size: 16px;
  outline: none;
`;

type TodoCreatorProps = {} & InjectedStoreProps;

const TodoCreator: FC<TodoCreatorProps> = ({ store }) => {
  const { todoStore } = store;

  const form = useForm<TTodo>({
    defaultValues: { task: '' },
  });

  const onSubmit: SubmitHandler<TTodo> = useCallback((payload) => {
    todoStore.addTodo(payload);

    form.reset();
  }, []);

  return (
    <Container>
      <StyledForm onSubmit={form.handleSubmit(onSubmit)}>
        <Row>
          <Input
            type="text"
            placeholder="할일을 입력하세요"
            {...form.register('task')}
          />
          <Button type="submit">추가</Button>
        </Row>
      </StyledForm>
    </Container>
  );
};

export default pluggedIn(TodoCreator);
