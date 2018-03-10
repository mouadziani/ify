import { RegisterComponent } from './register.component';
import { Route } from '@angular/router';

export const registerRoute: Route = {
  path: 'register',
  component: RegisterComponent,
  data: {
    authorities: [],
    pageTitle: 'Регистрация'
  }
};
