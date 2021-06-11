import { Instance, types as T } from 'mobx-state-tree';

export const Todo = T.model('Todo', {
  id: T.string,
  task: T.string,
  done: T.boolean,
});

export type TTodo = Instance<typeof Todo>;
export type AddTodoPayload = Pick<TTodo, 'task'>;
