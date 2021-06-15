import {
  ForwardRefRenderFunction,
  KeyboardEventHandler,
  forwardRef,
} from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled, { css } from 'styled-components';

const Container = styled.div`
  flex: 1;
`;

const EditorInput = styled.input(
  ({ theme }) => css`
    width: 100%;
    height: 100%;
    padding: 8px 12px;
    border: 1px solid ${theme.colors.border};
    appearance: none;
    color: ${theme.colors.gray800};
    outline: none;
  `,
);

type TaskEditorProps = {
  task: string;
  onSubmitChange: () => void;
};

const TaskEditor: ForwardRefRenderFunction<HTMLInputElement, TaskEditorProps> =
  ({ task, onSubmitChange }, ref) => {
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      const keyCode = e.which ? e.which : e.keyCode;
      if (keyCode === 13) {
        onSubmitChange();
      }
    };

    return (
      <Container>
        <OutsideClickHandler onOutsideClick={onSubmitChange}>
          <EditorInput
            defaultValue={task}
            autoFocus
            ref={ref}
            onKeyDown={handleKeyDown}
          />
        </OutsideClickHandler>
      </Container>
    );
  };

export default forwardRef(TaskEditor);
