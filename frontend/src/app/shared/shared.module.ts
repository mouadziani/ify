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
import { NewsService } from './service/news.service';
import { ArticleService } from './service/article.service';
import { VideoService } from './service/video.service';
import { PaginationService } from './service/pagination.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResolvePagingParamsService } from './service/resolve-paging-params.service';
import { DateConverterPipe } from './pipe/date-converter.pipe';
import { ArticleCategoryService } from './service/article-category.service';
import { VideoCategoryService } from './service/video-category.service';
import { NewsCategoryService } from './service/news-category.service';
import { TextSlicerPipe } from './pipe/text-slicer.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    NgbModule.forRoot()
  ],
  declarations: [
    HasAnyAuthorityDirective,
    DateConverterPipe,
    TextSlicerPipe
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
    StateStorageService,
    NewsService,
    ArticleService,
    VideoService,
    PaginationService,
    ResolvePagingParamsService,
    ArticleCategoryService,
    VideoCategoryService,
    NewsCategoryService
  ],
  exports: [
    HasAnyAuthorityDirective,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DateConverterPipe,
    TextSlicerPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
