import { Routes } from '@angular/router';
import { UserRouteAccessService } from '../../shared/auth/user-route-access.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SettingsComponent } from './settings.component';
import { ChangeImageComponent } from './change-image/change-image.component';
import { ChangeInfoComponent } from './change-info/change-info.component';

const SETTINGS_ROUTES = [
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: {
      pageTitle: 'Смена пароля - IdeaForYou'
    }
  }, {
    path: 'change-image',
    component: ChangeImageComponent,
    data: {
      pageTitle: 'Смена аватарки - IdeaForYou'
    }
  }, {
    path: 'change-info',
    component: ChangeInfoComponent,
    data: {
      pageTitle: 'Редактирование информации - IdeaForYou'
    }
  }
];

export const settingsState: Routes = [{
  path: 'settings',
  component: SettingsComponent,
  data: {
    authorities: ['ROLE_USER']
  },
  canActivate: [UserRouteAccessService],
  children: SETTINGS_ROUTES
}];
