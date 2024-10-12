import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../../Services/auth.service';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/sgin-in-sgin-up']);
      return false;
    }
  }

  canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate();
  }
}

export const authGuardGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuard).canActivate();
};


export const authChildGuard: CanActivateChildFn = (route, state) => {
  return inject(AuthGuard).canActivateChild();
};
