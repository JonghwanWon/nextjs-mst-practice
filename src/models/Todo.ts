import {  SnapshotOut, types as T } from 'mobx-state-tree';

export const Todo = T.model('Todo', {
  id: T.string,
  task: T.string,
  done: T.boolean,
});

export type TTodo = SnapshotOut<typeof Todo>
