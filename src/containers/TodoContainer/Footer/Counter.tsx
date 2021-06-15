import { observer } from 'mobx-react';
import { FC } from 'react';
import styled from 'styled-components';

import { media } from '~/helpers/styles/media';
import { getStore } from '~/stores/init';

const Container = styled.p`
  color: ${({ theme }) => theme.colors.gray700};
  font-size: 13px;

  ${media.mobile`
    margin: 8px 0 4px;
  `};
`;

type CounterProps = {};

const Counter: FC<CounterProps> = ({}) => {
  const todoStore = getStore((stores) => stores.todoStore);

  return <Container>{`남은 할일: ${todoStore.activeCount}개`}</Container>;
};

export default observer(Counter);
