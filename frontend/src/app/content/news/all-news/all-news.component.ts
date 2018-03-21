import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../../../shared/service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from '../../../shared/model/news.model';
import { POSTS_PER_PAGE } from '../../../app.constants';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ify-all-news',
  templateUrl: './all-news.component.html'
})
export class AllNewsComponent implements OnInit, OnDestroy {

  news: News[];
  routeData;
  page;
  previousPage;
  predicate;
  totalItems;
  postsPerPage;
  sub: Subscription;

  constructor(
    private newsService: NewsService,
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
    this.sub = this.newsService.query({
      page: this.page - 1,
      size: this.postsPerPage,
      sort: ['id,desc']
    }).subscribe(res => {
      this.news = res.body;
      this.totalItems = res.headers.get('X-Total-Count');
    });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.router.navigate(['/news'], {
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
