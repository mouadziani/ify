import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../shared/service/news.service';
import { News } from '../../../shared/model/news.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'ify-news-post',
  templateUrl: './news-post.component.html'
})
export class NewsPostComponent implements OnInit {

  news: News;
  lastNews: News[];

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.newsService.find(params['id'])
        .subscribe(res => {
          if (res) {
            this.news = res;
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
