import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { ProfileComponent } from './profile.component';

const PROFILE_ROUTES = [
  {
    path: '',
    component: BlogComponent
  }
];

export const profileState: Routes = [{
  path: 'account/:login',
  component: ProfileComponent,
  children: PROFILE_ROUTES
}];
