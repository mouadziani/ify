import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBlogComponent } from './all-blog/all-blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { blogRoute } from './blog.route';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(blogRoute)
  ],
  declarations: [AllBlogComponent, BlogPostComponent]
})
export class BlogModule { }
