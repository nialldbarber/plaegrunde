import { useSelector } from "@legendapp/state/react";
import { store$ } from "@/app/state/local/auth";

export function useIsUserAuthenticated() {
  const isAuthenticated = useSelector(() => store$.isAuthenticated.get());
  return isAuthenticated;
}

export function useIsUserNotAuthenticated() {
  const isNotAuthed = !useIsUserAuthenticated();
  return isNotAuthed;
}
