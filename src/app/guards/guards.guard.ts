import { CanActivateFn } from '@angular/router';

export const guardsGuard: CanActivateFn = (route, state) => {
  return true;
};
