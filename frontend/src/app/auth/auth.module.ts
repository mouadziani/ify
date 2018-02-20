import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
    LoginComponent,
    RegistrationComponent,
    AuthComponent
  ],
  providers: []
})
export class AuthModule { }
