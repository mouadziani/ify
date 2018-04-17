import { Routes } from '@angular/router';
import { AllBlogComponent } from './all-blog/all-blog.component';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';
import { BlogPostComponent } from './blog-post/blog-post.component';

export const blogRoute: Routes = [
  {
    path: 'blog',
    component: AllBlogComponent,
    resolve: { 'pagingParams': ResolvePagingParamsService },
    data: { pageTitle: 'Блоги - IdeaForYou' }
  }, {
    path: 'blog/:id',
    component: BlogPostComponent,
    data: { pageTitle: 'Блог - IdeaForYou' }
  }
];
