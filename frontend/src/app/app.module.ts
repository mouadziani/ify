import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UserRouteAccessService } from './shared/auth/user-route-access.service';
import { ErrorComponent } from './layouts/error/error.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainComponent } from './layouts/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { AccountModule } from './account/account.module';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { ContentModule } from './content/content.module';
import { ModeratorModule } from './moderator/moderator.module';


@NgModule({
  declarations: [
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    AccountModule,
    AdminModule,
    ModeratorModule,
    HttpClientModule,
    HttpClientXsrfModule,
    Ng2Webstorage.forRoot({ prefix: 'ify', separator: '-'}),
    ContentModule
  ],
  providers: [
    UserRouteAccessService,
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
