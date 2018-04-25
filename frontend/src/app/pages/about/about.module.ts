import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { RouterModule } from '@angular/router';
import { ROUTE } from './about.route';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTE),
    SharedModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
