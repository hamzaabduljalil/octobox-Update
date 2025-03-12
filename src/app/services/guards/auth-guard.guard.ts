import { CanActivateFn } from "@angular/router";

export const authGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return false;
  }
  return true;
};
