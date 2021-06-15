import { FC, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { InjectedStoreProps, pluggedIn } from '~/helpers/mobx';
import { TODO_FILTER } from '~/stores/TodoStore';

import { FilterKind } from './spec';

type TContainer = {
  isActive: boolean;
};
const Container = styled.div<TContainer>(
  ({ theme, isActive }) => css`
    padding: 6px 12px;
    border: 1px solid ${isActive ? theme.colors.primary : theme.colors.border};
    margin: 0 2px;
    background-color: #fff;
    color: ${isActive ? theme.colors.primary : theme.colors.gray500};
    cursor: pointer;
    font-size: 12px;
    transition: all 240ms linear;

    &:hover {
      border-color: ${isActive
        ? theme.colors.primary
        : theme.colors.borderDarken};
      color: ${isActive ? theme.colors.primary : theme.colors.gray700};
    }
  `,
);

const FilterName = styled.p``;

type FilterItemProps = {
  filter: FilterKind;
} & InjectedStoreProps;

const FilterItem: FC<FilterItemProps> = ({ store, filter }) => {
  const { todoStore } = store;

  const handleFilter = useCallback(
    (type: TODO_FILTER) => () => {
      todoStore.setFilter(type);
    },
    [],
  );

  return (
    <Container
      isActive={todoStore.filter === filter.type}
      onClick={handleFilter(filter.type)}
    >
      <FilterName>{filter.name}</FilterName>
    </Container>
  );
};

export default pluggedIn(FilterItem);
