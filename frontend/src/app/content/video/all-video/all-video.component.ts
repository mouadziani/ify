import { Component, OnDestroy, OnInit } from '@angular/core';
import { Video } from '../../../shared/model/video.model';
import { Subscription } from 'rxjs/Subscription';
import { VideoService } from '../../../shared/service/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { POSTS_PER_PAGE } from '../../../app.constants';

@Component({
  selector: 'ify-all-video',
  templateUrl: './all-video.component.html'
})
export class AllVideoComponent implements OnInit, OnDestroy {

  videos: Video[];
  routeData;
  page;
  previousPage;
  predicate;
  totalItems;
  postsPerPage;
  sub: Subscription;

  constructor(
    private videoService: VideoService,
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
    this.sub = this.videoService.query({
      page: this.page - 1,
      size: this.postsPerPage,
      sort: ['id,desc']
    }).subscribe(res => {
      this.videos = res.body;
      this.totalItems = res.headers.get('X-Total-Count');
    });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.router.navigate(['/video'], {
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
