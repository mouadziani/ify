import { UserRouteAccessService } from '../shared/auth/user-route-access.service';
import { Routes } from '@angular/router';

const MODERATOR_ROUTES = [];

export const moderatorState: Routes = [{
  path: '',
  data: {
    authorities: ['ROLE_MODERATOR']
  },
  canActivate: [UserRouteAccessService],
  children: MODERATOR_ROUTES
}];
