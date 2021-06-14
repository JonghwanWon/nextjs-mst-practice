import { inject, observer } from 'mobx-react';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';

import { TRootStore } from '~/stores/RootStore';

export type InjectedStoreProps = {
  store: TRootStore;
};

export function pluggedIn<P extends InjectedStoreProps>(
  container: IReactComponent<P>,
  store?: string,
) {
  const stores = ['store'];

  if (store) {
    stores.push(store);
  }

  return inject(...stores)(
    observer(container) as IReactComponent<Omit<P, keyof InjectedStoreProps>>,
  );
}
