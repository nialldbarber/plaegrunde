import { store$ } from "@/state/local/auth";

export function useIsUserAuthenticated() {
  return store$.isAuthenticated.get() === true;
}

export function useIsUserNotAuthenticated() {
  return store$.isAuthenticated.get() === false;
}
