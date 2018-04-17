import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModule } from './profile/profile.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileModule,
    SettingsModule
  ],
  declarations: []
})
export class AccountModule {}
