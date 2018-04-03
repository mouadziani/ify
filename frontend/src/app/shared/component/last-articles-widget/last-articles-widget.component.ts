import { Component, OnInit } from '@angular/core';
import { Article } from '../../model/article.model';
import { ArticleService } from '../../service/article.service';

@Component({
  selector: 'ify-last-articles-widget',
  templateUrl: './last-articles-widget.component.html'
})
export class LastArticlesWidgetComponent implements OnInit {

  articles: Article[];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.query({
      page: 0,
      size: 4,
      sort: ['id,desc']
    }).subscribe(res => {
      this.articles = res.body;
    });
  }
}
