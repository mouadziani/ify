import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../../../shared/service/news.service';
import { News } from '../../../shared/model/news.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'ify-news-post',
  templateUrl: './news-post.component.html'
})
export class NewsPostComponent implements OnInit, OnDestroy {

  news: News;
  lastNews: News[];
  routeSub: Subscription;
  newsSub: Subscription;
  lastNewsSub: Subscription;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.newsSub = this.newsService.find(params['id'])
        .subscribe(res => {
          this.news = res;
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
    this.newsSub.unsubscribe();
    this.lastNewsSub.unsubscribe();
  }
}
