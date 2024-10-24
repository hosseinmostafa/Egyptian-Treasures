import { inject, Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isAuthenticatedd()) {
      return true;  // المستخدم مسجل دخوله بالفعل
    } else {
      // حفظ الصفحة التي يحاول الوصول إليها في redirectUrl
      this.authService.redirectUrl = state.url;
      this.router.navigate(['/signup']);  // توجيهه إلى صفحة التسجيل أو تسجيل الدخول
      return false;
    }
  }
}

export const authGuardGuard: CanActivateFn = (router, state) => {
  return inject(AuthGuardService).canActivate(router, state);
}