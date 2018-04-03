import { Component, OnInit } from '@angular/core';
import { Article } from '../../../shared/model/article.model';
import { News } from '../../../shared/model/news.model';
import { Subscription } from 'rxjs/Subscription';
import { ArticleService } from '../../../shared/service/article.service';
import { NewsService } from '../../../shared/service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'ify-article-post',
  templateUrl: './article-post.component.html'
})
export class ArticlePostComponent implements OnInit {

  article: Article;
  lastNews: News[];

  constructor(
    private articleService: ArticleService,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.articleService.find(params['id'])
        .subscribe(res => {
          if (res) {
            this.article = res;
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
