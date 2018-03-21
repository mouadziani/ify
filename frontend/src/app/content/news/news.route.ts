import { Routes } from '@angular/router';
import { AllNewsComponent } from './all-news/all-news.component';
import { NewsPostComponent } from './news-post/news-post.component';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';

export const newsRoute: Routes = [
  {
    path: 'news',
    component: AllNewsComponent,
    resolve: {
      'pagingParams': ResolvePagingParamsService
    },
    data: {
      pageTitle: 'Новости - IdeaForYou'
    }
  }, {
    path: 'news/:id',
    component: NewsPostComponent,
    data: {
      pageTitle: 'Новость - IdeaForYou'
    }
  }
];
