import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './shared/services/login.service';
import { ApiRequestService } from './shared/api/api-request.service';
import { UserInfoService } from './shared/services/user-info.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { UsersService } from './shared/services/users.service';
import { BaseApi } from './shared/api/base-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';

@NgModule({
  declarations: [
    // Components, which contains other component (Common components)
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    // Common components
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
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
