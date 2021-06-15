import { FC } from 'react';
import styled from 'styled-components';

import { NoSearch } from '~/components/svgs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 12px;
`;

const Message = styled.p`
  margin-top: 8px;
  font-size: 14px;
`;

type EmptyListProps = {};

const EmptyList: FC<EmptyListProps> = ({}) => {
  return (
    <Container>
      <NoSearch size={80} />
      <Message>할일을 모두 완료한 것 같아요</Message>
    </Container>
  );
};

export default EmptyList;
