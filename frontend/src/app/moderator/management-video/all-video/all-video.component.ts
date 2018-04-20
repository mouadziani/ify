import { Component, OnInit } from '@angular/core';
import { Video } from '../../../shared/model/video.model';
import { VideoService } from '../../../shared/service/video.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Principal } from '../../../shared/auth/principal.service';
import { POSTS_PER_PAGE } from '../../../app.constants';
import { User } from '../../../shared/user/user.model';

@Component({
  selector: 'ify-all-video',
  templateUrl: './all-video.component.html'
})
export class AllVideoComponent implements OnInit {

  videos: Video[];
  routeData;
  page;
  previousPage;
  predicate;
  totalItems;
  postsPerPage;
  currentUser: User;

  constructor(
    private videoService: VideoService,
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
    this.videoService.query({
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
      this.router.navigate(['/moderator/video'], {
        queryParams: {
          page: this.page,
          size: this.postsPerPage,
          sort: ['id,desc']
        }
      });
      this.loadAll();
    }
  }

  deleteVideo(id: number) {
    this.videoService.delete(id).subscribe(() => this.loadAll());
  }
}
