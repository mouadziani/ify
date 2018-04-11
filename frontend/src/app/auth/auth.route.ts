import { Routes } from '@angular/router';
import { loginRoute } from './login/login.route';
import { registerRoute } from './register/register.route';

const routes = [
  loginRoute,
  registerRoute
];

export const authState: Routes = [{
  path: '',
  children: routes
}];
