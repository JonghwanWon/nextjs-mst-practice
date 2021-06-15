import { FC } from 'react';
import styled from 'styled-components';

import FilterItem from './FilterItem';
import { filterKinds } from './spec';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

type FilterProps = {};

const Filter: FC<FilterProps> = ({}) => {
  return (
    <Container>
      {filterKinds.map((filter) => (
        <FilterItem key={filter.type} filter={filter} />
      ))}
    </Container>
  );
};

export default Filter;
