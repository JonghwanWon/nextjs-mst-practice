import { FC, useCallback } from 'react';
import styled from 'styled-components';

import { InjectedStoreProps, pluggedIn } from '~/helpers/mobx';
import { TODO_FILTER } from '~/stores/TodoStore';

const Container = styled.div``;

const Filters = styled.div`
  display: flex; ;
`;

type TFilterItem = {
  isActive: boolean;
};
const FilterItem = styled.div<TFilterItem>`
  padding: 12px 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.gray50};
  color: ${({ theme, isActive }) => (isActive ? '#Fff' : theme.colors.gray800)};
  cursor: pointer;
`;

const FilterName = styled.p``;

type FilterProps = {} & InjectedStoreProps;

const Filter: FC<FilterProps> = ({ store }) => {
  const { todoStore } = store;

  const filters = [
    { type: TODO_FILTER.SHOW_ALL, name: '모두보기' },
    { type: TODO_FILTER.SHOW_COMPLETED, name: '완료한 항목 보기' },
    { type: TODO_FILTER.SHOW_ACTIVE, name: '진행중 항목 보기' },
  ];

  const handleFilter = useCallback(
    (type: TODO_FILTER) => () => {
      todoStore.setFilter(type);
    },
    [],
  );

  return (
    <Container>
      <Filters>
        {filters.map((filter) => (
          <FilterItem
            key={filter.type}
            isActive={todoStore.filter === filter.type}
            onClick={handleFilter(filter.type)}
          >
            <FilterName>{filter.name}</FilterName>
          </FilterItem>
        ))}
      </Filters>
    </Container>
  );
};

export default pluggedIn(Filter);
