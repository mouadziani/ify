import { Component, OnInit } from '@angular/core';
import { News } from '../../../shared/model/news.model';
import { NewsService } from '../../../shared/service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Principal } from '../../../shared/auth/principal.service';
import { POSTS_PER_PAGE } from '../../../app.constants';
import { User } from '../../../shared/user/user.model';

@Component({
  selector: 'ify-all-news',
  templateUrl: './all-news.component.html'
})
export class AllNewsComponent implements OnInit {

  news: News[];
  routeData;
  page;
  previousPage;
  predicate;
  totalItems;
  postsPerPage;
  currentUser: User;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private principal: Principal
  ) {
    this.postsPerPage = POSTS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe((data) => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.predicate = data.pagingParams.predicate;
    });
  }

  ngOnInit() {
    this.principal.identity().then(account => {
      this.currentUser = account;
      this.loadAll();
    });
  }

  loadAll() {
    this.newsService.query({
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
      this.router.navigate(['/moderator/news'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc']
        }
      });
      this.loadAll();
    }
  }

  deleteNews(id: number) {
    this.newsService.delete(id).subscribe(() => this.loadAll());
  }
}
