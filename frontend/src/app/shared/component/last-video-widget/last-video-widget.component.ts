import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../service/video.service';
import { Video } from '../../model/video.model';

@Component({
  selector: 'ify-last-video-widget',
  templateUrl: './last-video-widget.component.html'
})
export class LastVideoWidgetComponent implements OnInit {

  video: Video;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.query({
      page: 0,
      size: 1,
      sort: ['id,desc']
    }).subscribe(res => {
      this.video = res.body[0];
    });
  }
}
