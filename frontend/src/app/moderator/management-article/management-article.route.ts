import { Routes } from '@angular/router';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';
import { AllArticleComponent } from './all-article/all-article.component';
import { CreateArticleComponent } from './create-article/create-article.component';

export const managementArticleRoute: Routes = [
  {
    path: 'article',
    component: AllArticleComponent,
    resolve: {
      'pagingParams': ResolvePagingParamsService
    },
    data: {
      pageTitle: 'Управление статьями - IdeaForYou'
    }
  }, {
    path: 'article/create',
    component: CreateArticleComponent,
    data: {
      pageTitle: 'Создание статьи - IdeaForYou'
    }
  }, {
    path: 'article/:id',
    component: CreateArticleComponent,
    data: {
      pageTitle: 'Редактирование статьи - IdeaForYou'
    }
  }
];
