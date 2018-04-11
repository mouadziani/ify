import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { authState } from './auth.route';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(authState)
  ],
  declarations: [LoginComponent, RegisterComponent]
})
export class AuthModule { }
