import { Routes } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';

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
