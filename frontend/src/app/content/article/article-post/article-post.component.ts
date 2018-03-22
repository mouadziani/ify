import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../../../shared/model/article.model';
import { News } from '../../../shared/model/news.model';
import { Subscription } from 'rxjs/Subscription';
import { ArticleService } from '../../../shared/service/article.service';
import { NewsService } from '../../../shared/service/news.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'ify-article-post',
  templateUrl: './article-post.component.html'
})
export class ArticlePostComponent implements OnInit, OnDestroy {

  article: Article;
  lastNews: News[];
  routeSub: Subscription;
  articleSub: Subscription;
  lastNewsSub: Subscription;

  constructor(
    private articleService: ArticleService,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.articleSub = this.articleService.find(params['id'])
        .subscribe(res => {
          this.article = res;
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
    this.articleSub.unsubscribe();
    this.lastNewsSub.unsubscribe();
  }
}
