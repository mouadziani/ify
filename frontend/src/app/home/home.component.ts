import { Component, OnDestroy, OnInit } from '@angular/core';
import { VideoService } from '../shared/service/video.service';
import { NewsService } from '../shared/service/news.service';
import { ArticleService } from '../shared/service/article.service';
import { News } from '../shared/model/news.model';
import { Article } from '../shared/model/article.model';
import { Video } from '../shared/model/video.model';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ify-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {

  carouselPosts = [1, 2, 3];

  mainPosts = [1, 2, 3, 4, 5, 6];

  news: News[];

  articles: Article[];

  videos: Video[];

  subNews: Subscription;

  subArticles: Subscription;

  subVideos: Subscription;

  constructor(
    private newsService: NewsService,
    private articleService: ArticleService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.subNews = this.newsService.query({
      page: 0,
      size: 12,
      sort: ['id,desc']
    }).subscribe(res => {
      this.news = res.body;
    });
    this.subArticles = this.articleService.query({
      page: 0,
      size: 6,
      sort: ['id,desc']
    }).subscribe(res => {
      this.articles = res.body;
    });
    this.subVideos = this.videoService.query({
      page: 0,
      size: 8,
      sort: ['id,desc']
    }).subscribe(res => {
      this.videos = res.body;
    });
  }

  ngOnDestroy() {
    if (this.subNews) {
      this.subNews.unsubscribe();
    }
    if (this.subArticles) {
      this.subArticles.unsubscribe();
    }
    if (this.subVideos) {
      this.subVideos.unsubscribe();
    }
  }
}
