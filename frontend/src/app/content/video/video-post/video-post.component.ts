import { Component, OnInit } from '@angular/core';
import { Video } from '../../../shared/model/video.model';
import { News } from '../../../shared/model/news.model';
import { VideoService } from '../../../shared/service/video.service';
import { NewsService } from '../../../shared/service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { YOUTUBE_PATH, VIDEO_DISCRIMINATOR } from '../../../app.constants';

@Component({
  selector: 'ify-video-post',
  templateUrl: './video-post.component.html'
})
export class VideoPostComponent implements OnInit {

  video: Video;
  videoUrl: any;
  lastNews: News[];
  type = VIDEO_DISCRIMINATOR;

  constructor(
    private videoService: VideoService,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.videoService.find(params['id'])
        .subscribe(res => {
          if (res) {
            this.video = res;
            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(YOUTUBE_PATH + this.video.videoUrl);
            this.title.setTitle(res.title + ' - IdeaForYou');
            this.meta.addTags([
              { name: 'description', content: res.text }
            ]);
          } else {
            this.router.navigate(['/404']);
          }
        });
    });
    this.newsService.query({
      page: 0,
      size: 4,
      sort: ['id,desc']
    }).subscribe(res => {
      this.lastNews = res.body;
    });
  }
}
