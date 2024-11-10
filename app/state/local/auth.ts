import { observable } from "@legendapp/state";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";
import type { Session } from "@supabase/supabase-js";

type Store = {
  isAuthenticated: boolean;
  session: Session | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setSession: (session: Session | null) => void;
};

export const store$ = observable<Store>({
  isAuthenticated: false,
  session: null,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    store$.isAuthenticated.set(isAuthenticated);
  },
  setSession: (session: Session | null) => {
    store$.session.set(session);
  },
});

syncObservable(store$, {
  persist: {
    name: "auth_state",
    plugin: ObservablePersistMMKV,
  },
});
