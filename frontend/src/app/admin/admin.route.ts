import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../shared/auth/user-route-access.service';
import { userManagementRoute } from './user-management/user-management.route';

const ADMIN_ROUTES = [
  ...userManagementRoute
];

export const adminState: Routes = [{
  path: 'admin',
  data: {
    authorities: ['ROLE_ADMIN']
  },
  canActivate: [UserRouteAccessService],
  children: ADMIN_ROUTES
}];
