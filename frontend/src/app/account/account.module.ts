import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';
import { BlogManageModule } from './blog-manage/blog-manage.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileModule,
    SettingsModule,
    BlogManageModule
  ],
  declarations: []
})
export class AccountModule {}
