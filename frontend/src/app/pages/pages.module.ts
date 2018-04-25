import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundModule } from './not-found/not-found.module';
import { AboutModule } from './about/about.module';

@NgModule({
  imports: [
    CommonModule,
    NotFoundModule,
    AboutModule
  ],
  declarations: []
})
export class PagesModule { }
