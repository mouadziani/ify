import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { headerRoute } from './layouts/header/header.route';
import { errorRoute } from './layouts/error/error.route';

const routes = [
  headerRoute,
  ...errorRoute
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
