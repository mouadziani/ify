import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Principal } from './principal.service';
import { StateStorageService } from './state-storage.service';

@Injectable()
export class UserRouteAccessService implements CanActivate {

  constructor(
    private router: Router,
    private principal: Principal,
    private stateStorageService: StateStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    const authorities = route.data['authorities'];
    return this.checkLogin(authorities, state.url);
  }

  checkLogin(authorities: string[], url: string): Promise<boolean> {
    const principal = this.principal;
    return Promise.resolve(principal.identity().then((account) => {
      if (!authorities || authorities.length === 0) {
        return true;
      }
      if (account) {
        return principal.hasAnyAuthority(authorities).then((response) => {
          if (response) {
            return true;
          }
          return false;
        });
      }
      this.stateStorageService.storeUrl(url);
      this.router.navigate(['accessdenied']).then(() => {
        if (!account) {
          this.router.navigate(['login']);
        }
      });
      return false;
    }));
  }
}
