import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { accountState } from './account.route';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(accountState)
  ],
  declarations: []
})
export class AccountModule { }
