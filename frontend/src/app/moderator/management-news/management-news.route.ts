import { AllNewsComponent } from './all-news/all-news.component';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';
import { Routes } from '@angular/router';
import { CreateNewsComponent } from './create-news/create-news.component';

export const managementNewsRoute: Routes = [
  {
    path: 'news',
    component: AllNewsComponent,
    resolve: {
      'pagingParams': ResolvePagingParamsService
    },
    data: {
      pageTitle: 'Управление новостями - IdeaForYou'
    }
  }, {
    path: 'news/create',
    component: CreateNewsComponent,
    data: {
      pageTitle: 'Создание новости - IdeaForYou'
    }
  }, {
    path: 'news/:id',
    component: CreateNewsComponent,
    data: {
      pageTitle: 'Редактирование новости - IdeaForYou'
    }
  }
];
