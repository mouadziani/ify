import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticleComponent } from './all-article/all-article.component';
import { ArticlePostComponent } from './article-post/article-post.component';
import { articleRoute } from './article.route';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(articleRoute)
  ],
  declarations: [AllArticleComponent, ArticlePostComponent]
})
export class ArticleModule { }
