import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../shared/model/blog.model';
import { BlogCategory } from '../../../shared/model/blog-category.model';
import { BlogService } from '../../../shared/service/blog.service';
import { BlogCategoryService } from '../../../shared/service/blog-category.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'ify-create-blog',
  templateUrl: './create-blog.component.html'
})
export class CreateBlogComponent implements OnInit {

  blog: Blog;
  categories: BlogCategory[];

  constructor(
    private blogService: BlogService,
    private blogCategoryService: BlogCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    $('#text').summernote({
      height: 500
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.blogService.find(params['id']).subscribe(res => {
          this.blog = res;
          $('#text').summernote('code', res.text);
        });
      } else {
        this.blog = new Blog();
      }
    });
    this.blogCategoryService.getAll().subscribe(res => {
      this.categories = res;
    });
  }

  saveImg($event) {
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      this.blog.image = reader.result;
    };
    reader.readAsDataURL($event.target.files[0]);
  }

  save() {
    this.blog.text = $('#text').summernote('code');
    if (this.blog.id === undefined) {
      this.blogService.create(this.blog).subscribe(res => {
        this.router.navigate(['/blog-manage', res.id]);
      });
    } else {
      this.blogService.update(this.blog).subscribe();
    }
  }
}
