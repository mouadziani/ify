import { Component, OnInit } from '@angular/core';
import { Video } from '../../../shared/model/video.model';
import { VideoCategory } from '../../../shared/model/video-category.model';
import { VideoService } from '../../../shared/service/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VideoCategoryService } from '../../../shared/service/video-category.service';

declare var $: any;

@Component({
  selector: 'ify-create-video',
  templateUrl: './create-video.component.html'
})
export class CreateVideoComponent implements OnInit {

  video: Video;
  categories: VideoCategory[];

  constructor(
    private videoService: VideoService,
    private videoCategoryService: VideoCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    $('#text').summernote({
      height: 500
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.videoService.find(params['id']).subscribe(res => {
          this.video = res;
          $('#text').summernote('code', res.text);
        });
      } else {
        this.video = new Video();
      }
    });
    this.videoCategoryService.getAll().subscribe(res => {
      this.categories = res;
    });
  }

  saveImg($event) {
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      this.video.image = reader.result;
    };
    reader.readAsDataURL($event.target.files[0]);
  }

  save() {
    this.video.text = $('#text').summernote('code');
    if (this.video.id === undefined) {
      this.videoService.create(this.video).subscribe(res => {
        this.router.navigate(['/moderator/video', res.id]);
      });
    } else {
      this.videoService.update(this.video).subscribe();
    }
  }
}
