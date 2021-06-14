import { Instance, types as T } from 'mobx-state-tree';

import SampleStore from '../TodoStore';

const rootStore = T.model({
  todoStore: T.optional(SampleStore, {}),
})
  .views((self) => ({}))
  .actions((self) => ({}));

export type TRootStore = Instance<typeof rootStore>;
export default rootStore;
