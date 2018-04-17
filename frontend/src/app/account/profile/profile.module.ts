import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { BlogComponent } from './blog/blog.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { profileState } from './profile.route';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(profileState)
  ],
  declarations: [ProfileComponent, BlogComponent]
})
export class ProfileModule { }
