import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../shared/model/blog.model';
import { BlogService } from '../../../shared/service/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { POSTS_PER_PAGE } from '../../../app.constants';

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

  constructor(
    private blogService: BlogService,
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
    this.blogService.query({
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
      this.router.navigate(['/blog'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc']
        }
      });
      this.loadAll();
    }
  }
}
