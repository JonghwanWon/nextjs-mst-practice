/*
 * the entry of the App root store
 *
 */

import { applySnapshot } from 'mobx-state-tree';
import { useMemo } from 'react';

import { isServer } from '~/helpers/utils/isServer';

import RootStore, { TRootStore } from './RootStore';

let _rootStore: TRootStore | undefined;

const initRootStore = (snapshot: any = null): TRootStore => {
  const rootStore = _rootStore ?? RootStore.create(snapshot || {});

  if (snapshot) {
    applySnapshot(rootStore, snapshot);
  }

  // For SSG and SSR always create a new store
  if (isServer) return rootStore;
  // Create the store once in the client
  if (!_rootStore) _rootStore = rootStore;

  return rootStore;
};

export const useStore = (
  initialState?: DeepPartial<TRootStore>,
): TRootStore => {
  const store = useMemo(() => initRootStore(initialState), [initialState]);
  return store;
};
