import { TODO_FILTER } from '~/stores/TodoStore';

export type FilterKind = {
  type: TODO_FILTER;
  name: string;
};

export const filterKinds: FilterKind[] = [
  { type: TODO_FILTER.SHOW_ALL, name: 'All' },
  { type: TODO_FILTER.SHOW_COMPLETED, name: 'Completed' },
  { type: TODO_FILTER.SHOW_ACTIVE, name: 'Active' },
];
