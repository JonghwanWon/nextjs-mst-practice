import { Instance, SnapshotOut, types as T } from 'mobx-state-tree';

export const Todo = T.model('Todo', {
  id: T.identifier,
  task: T.string,
  completed: T.boolean,
});

export type TodoInstance = Instance<typeof Todo>;
export type TTodo = SnapshotOut<typeof Todo>;
