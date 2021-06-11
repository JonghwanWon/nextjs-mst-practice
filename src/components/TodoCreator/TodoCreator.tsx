import { FormEventHandler, useRef, useState } from 'react';
import { FC } from 'react';
import styled from 'styled-components';

import { TTodoStore } from '~/stores/TodoStore';
import colors from '~/theme/colors';

const Container = styled.div``;

const StyledForm = styled.form``;

const Row = styled.div`
  display: flex;
  align-items: stretch;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${colors.border};
  appearance: none;
  outline: none;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid ${colors.border};
  appearance: none;
  background-color: ${colors.green400};
  color: #fff;
  font-size: 16px;
  outline: none;
`;

type TodoCreatorProps = {
  store: TTodoStore;
};

const TodoCreator: FC<TodoCreatorProps> = ({ store }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    store.addTodo({ task: inputValue });
    setInputValue('');
  };

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <Row>
          <Input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            ref={inputRef}
            placeholder="할일을 입력하세요"
          />
          <Button type="submit">추가</Button>
        </Row>
      </StyledForm>
    </Container>
  );
};

export default TodoCreator;
