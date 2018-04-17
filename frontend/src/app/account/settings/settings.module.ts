import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { settingsState } from './settings.route';
import { SettingsComponent } from './settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeImageComponent } from './change-image/change-image.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(settingsState)
  ],
  declarations: [SettingsComponent, ChangePasswordComponent, ChangeImageComponent]
})
export class SettingsModule {}
