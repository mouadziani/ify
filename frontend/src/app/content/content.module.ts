import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsModule } from './news/news.module';
import { ArticleModule } from './article/article.module';
import { VideoModule } from './video/video.module';
import { BlogModule } from './blog/blog.module';

@NgModule({
  imports: [
    CommonModule,
    NewsModule,
    ArticleModule,
    VideoModule,
    BlogModule
  ],
  declarations: []
})
export class ContentModule { }
