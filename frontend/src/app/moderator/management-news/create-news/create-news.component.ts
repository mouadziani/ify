import { Component, OnInit } from '@angular/core';
import { News } from '../../../shared/model/news.model';
import { NewsCategory } from '../../../shared/model/news-category.model';
import { NewsService } from '../../../shared/service/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsCategoryService } from '../../../shared/service/news-category.service';

declare var $: any;

@Component({
  selector: 'ify-create-news',
  templateUrl: './create-news.component.html'
})
export class CreateNewsComponent implements OnInit {

  news: News;
  categories: NewsCategory[];

  constructor(
    private newsService: NewsService,
    private newsCategoryService: NewsCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    $('#text').summernote({
      height: 500
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.newsService.find(params['id']).subscribe(res => {
          this.news = res;
          $('#text').summernote('code', res.text);
        });
      } else {
        this.news = new News();
      }
    });
    this.newsCategoryService.getAll().subscribe(res => {
      this.categories = res;
    });
  }

  save() {
    this.news.text = $('#text').summernote('code');
    if (this.news.id === undefined) {
      this.newsService.create(this.news).subscribe(res => {
        this.router.navigate(['/moderator/news', res.id]);
      });
    } else {
      this.newsService.update(this.news).subscribe();
    }
  }
}
