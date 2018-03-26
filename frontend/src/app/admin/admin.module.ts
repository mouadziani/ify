import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { adminState } from './admin.route';
import { RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(adminState)
  ],
  declarations: [UserManagementComponent]
})
export class AdminModule { }
