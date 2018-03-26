import { Routes } from '@angular/router';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';
import { AllArticleComponent } from './all-article/all-article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

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
    component: EditArticleComponent,
    data: {
      pageTitle: 'Редактирование статьи - IdeaForYou'
    }
  }
];
