import { Component, OnInit, Input } from '@angular/core';
import { News } from '../../model/news.model';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'ify-last-news-widget',
  templateUrl: './last-news-widget.component.html'
})
export class LastNewsWidgetComponent implements OnInit {

  @Input()
  currentNews: News;

  news: News[];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.query({
      page: 0,
      size: 5,
      sort: ['id,desc']
    }).subscribe(res => {
      if (this.currentNews) {
        this.news = res.body.filter(n => n.id !== this.currentNews.id);
        if (this.news.length !== 4) {
          this.news.pop();
        }
      } else {
        this.news = res.body.slice(0, 4);
      }
    });
  }
}
