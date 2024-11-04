import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { configureSynced, synced } from "@legendapp/state/sync";

type Store = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const syncedStore = configureSynced(synced, {
  persist: {
    name: "auth_state",
    plugin: ObservablePersistMMKV,
  },
});

export const store$ = observable<Store>({
  isAuthenticated: syncedStore({
    initial: false,
    persist: {
      name: "is_authenticated",
    },
  }),
  setIsAuthenticated: (isAuthenticated: boolean) => {
    store$.isAuthenticated.set(isAuthenticated);
  },
});
