import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule} from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import {LoginService} from "./shared/services/login.service";
import {ApiRequestService} from "./shared/api/api-request.service";
import {UserInfoService} from "./shared/services/user-info.service";
import {AuthGuard} from "./shared/guards/auth.guard";
import {UsersService} from "./shared/services/users.service";
import {BaseApi} from "./shared/api/base-api";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [
    AuthGuard,
    UserInfoService,
    ApiRequestService,
    LoginService,
    UsersService,
    BaseApi
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
