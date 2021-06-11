import { applySnapshot } from 'mobx-state-tree';
import { useMemo } from 'react';

import RootStore, { TRootStore } from './RootStore';

let clientSideRootStore: TRootStore | undefined;

const initRootStore = (snapshot: any = {}): TRootStore => {
  const rootStore = RootStore.create(snapshot, {});

  if (snapshot) {
    applySnapshot(rootStore, snapshot);
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return rootStore;
  // Create the store once in the client
  if (!clientSideRootStore) clientSideRootStore = rootStore;

  return rootStore;
};

export const useStore = (initialState?: TRootStore): TRootStore => {
  const store = useMemo(() => initRootStore(initialState), [initialState]);
  return store;
};
