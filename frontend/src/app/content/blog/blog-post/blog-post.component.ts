import { Component, OnInit } from '@angular/core';
import { Blog } from '../../../shared/model/blog.model';
import { BLOG_DISCRIMINATOR } from '../../../app.constants';
import { BlogService } from '../../../shared/service/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'ify-blog-post',
  templateUrl: './blog-post.component.html'
})
export class BlogPostComponent implements OnInit {

  blog: Blog;
  type = BLOG_DISCRIMINATOR;

  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit() {
    this.loadAll();
  }

  loadAll() {
    this.route.params.subscribe(params => {
      this.blogService.find(params['id'])
        .subscribe(res => {
          if (res) {
            this.blog = res;
            this.title.setTitle(res.title + ' - IdeaForYou');
            this.meta.addTags([
              { name: 'description', content: res.text }
            ]);
          } else {
            this.router.navigate(['/404']);
          }
        });
    });
  }
}
