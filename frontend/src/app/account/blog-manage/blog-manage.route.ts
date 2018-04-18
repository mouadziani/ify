import { Routes } from '@angular/router';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';
import { AllBlogComponent } from './all-blog/all-blog.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';

export const manageBlogRoute: Routes = [
  {
    path: 'blog-manage',
    component: AllBlogComponent,
    resolve: {
      'pagingParams': ResolvePagingParamsService
    },
    data: {
      pageTitle: 'Управление постами - IdeaForYou'
    }
  }, {
    path: 'blog-manage/create',
    component: CreateBlogComponent,
    data: {
      pageTitle: 'Создание поста - IdeaForYou'
    }
  }, {
    path: 'blog-manage/:id',
    component: CreateBlogComponent,
    data: {
      pageTitle: 'Редактирование поста - IdeaForYou'
    }
  }
];
