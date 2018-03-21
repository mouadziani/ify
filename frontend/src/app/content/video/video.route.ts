import { Routes } from '@angular/router';
import { AllVideoComponent } from './all-video/all-video.component';
import { VideoPostComponent } from './video-post/video-post.component';
import { ResolvePagingParamsService } from '../../shared/service/resolve-paging-params.service';

export const videoRoute: Routes = [
  {
    path: 'video',
    component: AllVideoComponent,
    resolve: {
      'pagingParams': ResolvePagingParamsService
    },
    data: {
      pageTitle: 'Видео - IdeaForYou'
    }
  }, {
    path: 'video/:id',
    component: VideoPostComponent,
    data: {
      pageTitle: 'Видео - IdeaForYou'
    }
  }
];
