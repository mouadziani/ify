import { Component, OnDestroy, OnInit } from '@angular/core';
import { Article } from '../../../shared/model/article.model';
import { Subscription } from 'rxjs/Subscription';
import { ArticleService } from '../../../shared/service/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { POSTS_PER_PAGE } from '../../../app.constants';

@Component({
  selector: 'ify-all-article',
  templateUrl: './all-article.component.html'
})
export class AllArticleComponent implements OnInit, OnDestroy {

  articles: Article[];
  routeData;
  page;
  previousPage;
  predicate;
  totalItems;
  postsPerPage;
  sub: Subscription;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.postsPerPage = POSTS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.predicate = data.pagingParams.predicate;
    });
  }

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.sub = this.articleService.query({
      page: this.page - 1,
      size: this.postsPerPage,
      sort: ['id,desc']
    }).subscribe(res => {
      this.articles = res.body;
      this.totalItems = res.headers.get('X-Total-Count');
    });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.router.navigate(['/article'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc']
        }
      });
      this.loadAll();
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
