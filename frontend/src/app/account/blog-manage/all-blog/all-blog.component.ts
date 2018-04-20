import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../shared/model/blog.model';
import { BlogService } from '../../../shared/service/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Principal } from '../../../shared/auth/principal.service';
import { POSTS_PER_PAGE } from '../../../app.constants';
import { User } from '../../../shared/user/user.model';

@Component({
  selector: 'ify-all-blog',
  templateUrl: './all-blog.component.html'
})
export class AllBlogComponent implements OnInit {

  blogs: Blog[];
  routeData;
  page;
  previousPage;
  predicate;
  totalItems;
  postsPerPage;
  currentUser: User;

  constructor(
    private blogService: BlogService,
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
    this.blogService.queryByUser(this.currentUser.login, {
      page: this.page - 1,
      size: this.postsPerPage,
      sort: ['id,desc']
    }).subscribe(res => {
      this.blogs = res.body;
      this.totalItems = res.headers.get('X-Total-Count');
    });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.router.navigate(['/blog-manage'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc']
        }
      });
      this.loadAll();
    }
  }

  deleteBlog(id: number) {
    this.blogService.delete(id).subscribe(() => this.loadAll());
  }
}
