import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBlogComponent } from './all-blog/all-blog.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { manageBlogRoute } from './blog-manage.route';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(manageBlogRoute)
  ],
  declarations: [AllBlogComponent, CreateBlogComponent]
})
export class BlogManageModule { }
