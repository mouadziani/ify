import { UserRouteAccessService } from '../shared/auth/user-route-access.service';
import { Routes } from '@angular/router';
import {managementNewsRoute} from "./management-news/management-news.route";
import {managementArticleRoute} from "./management-article/management-article.route";
import {managementVideoRoute} from "./management-video/management-video.route";

const MODERATOR_ROUTES = [
  ...managementNewsRoute,
  ...managementArticleRoute,
  ...managementVideoRoute
];

export const moderatorState: Routes = [{
  path: 'moderator',
  data: {
    authorities: ['ROLE_MODERATOR']
  },
  canActivate: [UserRouteAccessService],
  children: MODERATOR_ROUTES
}];
