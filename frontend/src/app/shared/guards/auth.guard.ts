import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';
import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userInfoService: UserInfoService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (this.userInfoService.isLoggedIn()) {
      return true;
    }
    console.log('User is not logged - This routing guard prvents redirection to any routes that needs logging.');
    this.loginService.landingPage = url;
    this.router.navigate(['login']);
    return false;
  }
}
