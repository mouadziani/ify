import { ErrorComponent } from './error.component';
import { Routes } from '@angular/router';

export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'Ошибка'
    },
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'Ошибка',
      error403: true
    },
  }
];
