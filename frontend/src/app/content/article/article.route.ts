import { AllArticleComponent } from './all-article/all-article.component';
import { Routes } from '@angular/router';
import { ArticlePostComponent } from './article-post/article-post.component';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';

export const articleRoute: Routes = [
  {
    path: 'article',
    component: AllArticleComponent,
    resolve: {
      'pagingParams': ResolvePagingParamsService
    },
    data: {
      pageTitle: 'Статьи - IdeaForYou'
    }
  }, {
    path: 'article/:id',
    component: ArticlePostComponent,
    data: {
      pageTitle: 'Статья - IdeaForYou'
    }
  }
];
