import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { moderatorState } from './moderator.route';
import { CreateNewsComponent } from './management-news/create-news/create-news.component';
import { CreateArticleComponent } from './management-article/create-article/create-article.component';
import { AllArticleComponent } from './management-article/all-article/all-article.component';
import { AllNewsComponent } from './management-news/all-news/all-news.component';
import { AllVideoComponent } from './management-video/all-video/all-video.component';
import { CreateVideoComponent } from './management-video/create-video/create-video.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(moderatorState)
  ],
  declarations: [
    AllNewsComponent,
    CreateNewsComponent,
    AllArticleComponent,
    CreateArticleComponent,
    AllVideoComponent,
    CreateVideoComponent,
  ]
})
export class ModeratorModule { }
