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
import { LastVideoWidgetComponent } from './component/last-video-widget/last-video-widget.component';
import { LastArticlesWidgetComponent } from './component/last-articles-widget/last-articles-widget.component';
import { LastNewsWidgetComponent } from './component/last-news-widget/last-news-widget.component';
import { VkGroupWidgetComponent } from './component/vk-group-widget/vk-group-widget.component';
import { RouterModule } from '@angular/router';
import { LastNewsBottomComponent } from './component/last-news-bottom/last-news-bottom.component';
import { CommentService } from './service/comment.service';
import { CommentsComponent } from './component/comments/comments.component';
import { LoaderComponent } from './component/loader/loader.component';
import { BlogCategoryService } from './service/blog-category.service';
import { BlogService } from './service/blog.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CookieModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule
  ],
  declarations: [
    HasAnyAuthorityDirective,
    DateConverterPipe,
    TextSlicerPipe,
    LastVideoWidgetComponent,
    LastArticlesWidgetComponent,
    LastNewsWidgetComponent,
    VkGroupWidgetComponent,
    LastNewsBottomComponent,
    CommentsComponent,
    LoaderComponent
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
    NewsCategoryService,
    CommentService,
    BlogCategoryService,
    BlogService
  ],
  exports: [
    HasAnyAuthorityDirective,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DateConverterPipe,
    TextSlicerPipe,
    LastVideoWidgetComponent,
    LastArticlesWidgetComponent,
    LastNewsWidgetComponent,
    VkGroupWidgetComponent,
    LastNewsBottomComponent,
    CommentsComponent,
    LoaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
