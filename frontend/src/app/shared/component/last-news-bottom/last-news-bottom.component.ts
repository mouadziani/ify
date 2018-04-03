import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from '../../service/news.service';
import { News } from '../../model/news.model';

@Component({
  selector: 'ify-last-news-bottom',
  templateUrl: './last-news-bottom.component.html'
})
export class LastNewsBottomComponent implements OnInit {

  news: News[];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.query({
      page: 0,
      size: 4,
      sort: ['id,desc']
    }).subscribe(res => {
      this.news = res.body;
    });
  }
}
