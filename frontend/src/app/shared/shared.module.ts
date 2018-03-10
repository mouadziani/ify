import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthServerProvider } from './auth/auth-session.service';
import { AccountService } from './auth/account.service';
import { UserService } from './user/user.service';
import { Principal } from './auth/principal.service';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { LoginService } from './auth/login.service';
import { RegisterService } from './auth/register.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CSRFService } from './auth/csrf.service';
import { StateStorageService } from './auth/state-storage.service';
import { CookieModule } from 'ngx-cookie';
import { BaseApiService } from './api/base-api.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot()
  ],
  declarations: [
    HasAnyAuthorityDirective
  ],
  providers: [
    BaseApiService,
    LoginService,
    RegisterService,
    AccountService,
    Principal,
    AuthServerProvider,
    UserService,
    DatePipe,
    CSRFService,
    StateStorageService
  ],
  exports: [
    HasAnyAuthorityDirective,
    DatePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }