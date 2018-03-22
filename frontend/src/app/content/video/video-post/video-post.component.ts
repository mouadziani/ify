import { Component, OnDestroy, OnInit } from '@angular/core';
import { Video } from '../../../shared/model/video.model';
import { News } from '../../../shared/model/news.model';
import { Subscription } from 'rxjs/Subscription';
import { VideoService } from '../../../shared/service/video.service';
import { NewsService } from '../../../shared/service/news.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'ify-video-post',
  templateUrl: './video-post.component.html'
})
export class VideoPostComponent implements OnInit, OnDestroy {

  video: Video;
  lastNews: News[];
  routeSub: Subscription;
  videoSub: Subscription;
  lastNewsSub: Subscription;

  constructor(
    private videoService: VideoService,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.videoSub = this.videoService.find(params['id'])
        .subscribe(res => {
          this.video = res;
          this.title.setTitle(res.title + ' - IdeaForYou');
          this.meta.addTags([
            { name: 'description', content: res.text }
          ]);
        });
    });
    this.lastNewsSub = this.newsService.query({
      page: 0,
      size: 4,
      sort: ['id,desc']
    }).subscribe(res => {
      this.lastNews = res.body;
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.videoSub.unsubscribe();
    this.lastNewsSub.unsubscribe();
  }
}
