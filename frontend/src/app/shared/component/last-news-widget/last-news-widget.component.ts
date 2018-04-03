import { Component, OnInit } from '@angular/core';
import { News } from '../../model/news.model';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'ify-last-news-widget',
  templateUrl: './last-news-widget.component.html'
})
export class LastNewsWidgetComponent implements OnInit {

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
