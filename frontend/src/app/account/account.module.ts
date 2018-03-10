import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { accountState } from './account.route';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(accountState)
  ],
  declarations: [LoginComponent, RegisterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AccountModule { }
