import { AllVideoComponent } from './all-video/all-video.component';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';
import { Routes } from '@angular/router';
import { CreateVideoComponent } from './create-video/create-video.component';

export const managementVideoRoute: Routes = [
  {
    path: 'video',
    component: AllVideoComponent,
    resolve: {
      'pagingParams': ResolvePagingParamsService
    },
    data: {
      pageTitle: 'Управление видео - IdeaForYou'
    }
  }, {
    path: 'video/create',
    component: CreateVideoComponent,
    data: {
      pageTitle: 'Создание видео - IdeaForYou'
    }
  }, {
    path: 'video/:id',
    component: CreateVideoComponent,
    data: {
      pageTitle: 'Редактирование видео - IdeaForYou'
    }
  }
];
