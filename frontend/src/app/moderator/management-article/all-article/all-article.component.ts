import { Component, OnInit } from '@angular/core';
import { Article } from '../../../shared/model/article.model';
import { ArticleService } from '../../../shared/service/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Principal } from '../../../shared/auth/principal.service';
import { POSTS_PER_PAGE } from '../../../app.constants';
import { Account } from '../../../shared/user/account.model';

@Component({
  selector: 'ify-all-article',
  templateUrl: './all-article.component.html'
})
export class AllArticleComponent implements OnInit {

  articles: Article[];
  routeData;
  page;
  previousPage;
  predicate;
  totalItems;
  postsPerPage;
  currentAccount: Account;

  constructor(
    private articleService: ArticleService,
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
      this.currentAccount = account;
      this.loadAll();
    });
  }

  loadAll() {
    this.articleService.query({
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
      this.router.navigate(['/moderator/article'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc']
        }
      });
      this.loadAll();
    }
  }

  deleteArticle(id: number) {
    this.articleService.delete(id).subscribe(() => this.loadAll());
  }
}
