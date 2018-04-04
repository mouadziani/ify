import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../shared/service/article.service';
import { Article } from '../../../shared/model/article.model';
import { ArticleCategory } from '../../../shared/model/article-category.model';
import { ArticleCategoryService } from '../../../shared/service/article-category.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'ify-create-article',
  templateUrl: './create-article.component.html'
})
export class CreateArticleComponent implements OnInit {

  article: Article;
  categories: ArticleCategory[];

  constructor(
    private articleService: ArticleService,
    private articleCategoryService: ArticleCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    $('#text').summernote({
      height: 500
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.articleService.find(params['id']).subscribe(res => {
          this.article = res;
          $('#text').summernote('code', res.text);
        });
      } else {
        this.article = new Article();
      }
    });
    this.articleCategoryService.getAll().subscribe(res => {
      this.categories = res;
    });
  }

  saveImg($event) {
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      this.article.image = reader.result;
    };
    reader.readAsDataURL($event.target.files[0]);
  }

  save() {
    this.article.text = $('#text').summernote('code');
    if (this.article.id === undefined) {
      this.articleService.create(this.article).subscribe(res => {
        this.router.navigate(['/moderator/article', res.id]);
      });
    } else {
      this.articleService.update(this.article).subscribe();
    }
  }
}
