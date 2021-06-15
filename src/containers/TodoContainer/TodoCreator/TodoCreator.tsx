import { useCallback } from 'react';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { InjectedStoreProps, pluggedIn } from '~/helpers/mobx';
import { TTodo } from '~/models/Todo';

const Container = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StyledForm = styled.form``;

const Row = styled.div`
  display: flex;
  align-items: stretch;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: none;
  appearance: none;
  color: ${({ theme }) => theme.colors.gray800};
  font-size: 16px;
  outline: none;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  appearance: none;
  background-color: ${({ theme }) => theme.colors.gray200};
  color: ${({ theme }) => theme.colors.gray800};
  font-size: 14px;
  font-weight: 500;
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
            placeholder="할일을 입력해주세요"
            {...form.register('task')}
          />
          <Button type="submit">추가</Button>
        </Row>
      </StyledForm>
    </Container>
  );
};

export default pluggedIn(TodoCreator);
