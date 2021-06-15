import { FC } from 'react';
import styled from 'styled-components';

import { media } from '~/helpers/styles/media';

import Counter from './Counter';
import Filter from './Filter';

const Container = styled.div`
  padding: 8px 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Indicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.mobile`
    flex-direction: column-reverse;
    align-items: stretch;
  `};
`;

const Help = styled.p`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 13px;
`;

type FooterProps = {};

const Footer: FC<FooterProps> = ({}) => {
  return (
    <Container>
      <Indicators>
        <Counter />
        <Filter />
      </Indicators>
      <Help>할일을 더블클릭해 수정할 수 있어요.</Help>
    </Container>
  );
};

export default Footer;
