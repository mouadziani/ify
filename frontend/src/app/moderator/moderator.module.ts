import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { moderatorState } from './moderator.route';
import { CreateNewsComponent } from './management-news/create-news/create-news.component';
import { EditNewsComponent } from './management-news/edit-news/edit-news.component';
import { EditArticleComponent } from './management-article/edit-article/edit-article.component';
import { CreateArticleComponent } from './management-article/create-article/create-article.component';
import { AllArticleComponent } from './management-article/all-article/all-article.component';
import { AllNewsComponent } from './management-news/all-news/all-news.component';
import { AllVideoComponent } from './management-video/all-video/all-video.component';
import { CreateVideoComponent } from './management-video/create-video/create-video.component';
import { EditVideoComponent } from './management-video/edit-video/edit-video.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(moderatorState)
  ],
  declarations: [
    AllNewsComponent,
    CreateNewsComponent,
    EditNewsComponent,
    AllArticleComponent,
    CreateArticleComponent,
    EditArticleComponent,
    AllVideoComponent,
    CreateVideoComponent,
    EditVideoComponent
  ]
})
export class ModeratorModule { }
