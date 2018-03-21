import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AllNewsComponent } from './all-news/all-news.component';
import { NewsPostComponent } from './news-post/news-post.component';
import { newsRoute } from './news.route';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(newsRoute)
  ],
  declarations: [AllNewsComponent, NewsPostComponent]
})
export class NewsModule {}
