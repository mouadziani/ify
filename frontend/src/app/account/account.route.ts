import { Routes } from '@angular/router';
import { loginRoute } from './login/login.route';
import { registerRoute } from './register/register.route';

const routes = [
  loginRoute,
  registerRoute
];

export const accountState: Routes = [{
  path: '',
  children: routes
}];
