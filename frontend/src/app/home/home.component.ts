import { Component, OnInit } from '@angular/core';
import { VideoService } from '../shared/service/video.service';
import { NewsService } from '../shared/service/news.service';
import { ArticleService } from '../shared/service/article.service';
import { News } from '../shared/model/news.model';
import { Article } from '../shared/model/article.model';
import { Video } from '../shared/model/video.model';

@Component({
  selector: 'ify-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  news: News[];
  articles: Article[];
  videos: Video[];

  constructor(
    private newsService: NewsService,
    private articleService: ArticleService,
    private videoService: VideoService
  ) { }

  ngOnInit() {
    this.newsService.query({
      page: 0,
      size: 12,
      sort: ['id,desc']
    }).subscribe(res => {
      this.news = res.body;
    });
    this.articleService.query({
      page: 0,
      size: 6,
      sort: ['id,desc']
    }).subscribe(res => {
      this.articles = res.body;
    });
    this.videoService.query({
      page: 0,
      size: 8,
      sort: ['id,desc']
    }).subscribe(res => {
      this.videos = res.body;
    });
  }
}
