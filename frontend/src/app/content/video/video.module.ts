import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllVideoComponent } from './all-video/all-video.component';
import { VideoPostComponent } from './video-post/video-post.component';
import { videoRoute } from './video.route';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(videoRoute)
  ],
  declarations: [AllVideoComponent, VideoPostComponent]
})
export class VideoModule { }
