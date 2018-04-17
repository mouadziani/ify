import { Injectable } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { Observable } from 'rxjs/Observable';
import { BlogCategory } from '../model/blog-category.model';

@Injectable()
export class BlogCategoryService {

  private url = 'api/blog-category';

  constructor(private api: BaseApiService) {}

  create(articleCategory: BlogCategory): Observable<any> {
    return this.api.post(this.url, articleCategory);
  }

  update(articleCategory: BlogCategory): Observable<any> {
    return this.api.put(this.url, articleCategory);
  }

  find(id: number): Observable<BlogCategory> {
    return this.api.get<BlogCategory>(`${this.url}/${id}`);
  }

  getAll(): Observable<BlogCategory[]> {
    return this.api.get<BlogCategory[]>(this.url);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.url}/${id}`);
  }
}
