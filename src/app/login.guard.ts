import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthServiceService } from './auth/auth-service.service'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean  {

    const isLogin: string = this.authService.getLocalStorageLogin();
    if (isLogin === 'true') {
      return true;
    } else {
      this.router.navigate(['auth'])
      return false
    }
  }
}
