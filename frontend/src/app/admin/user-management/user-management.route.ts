import { Injectable } from '@angular/core';
import { CanActivate, Routes } from '@angular/router';
import { Principal } from '../../shared/auth/principal.service';
import { UserManagementComponent } from './user-management.component';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';

@Injectable()
export class UserResolve implements CanActivate {

  constructor(private principal: Principal) { }

  canActivate() {
    return this.principal.identity().then((account) => this.principal.hasAnyAuthority(['ROLE_ADMIN']));
  }
}

export const userManagementRoute: Routes = [
  {
    path: 'user-management',
    component: UserManagementComponent,
    resolve: {
      'pagingParams': ResolvePagingParamsService
    },
    data: {
      pageTitle: 'Пользователи - IdeaForYou'
    }
  }
];
