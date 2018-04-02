import { Injectable } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { ArticleCategory } from '../model/article-category.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ArticleCategoryService {

  private url = 'api/article-category';

  constructor(private api: BaseApiService) {}

  create(articleCategory: ArticleCategory): Observable<any> {
    return this.api.post(this.url, articleCategory);
  }

  update(articleCategory: ArticleCategory): Observable<any> {
    return this.api.put(this.url, articleCategory);
  }

  find(id: number): Observable<ArticleCategory> {
    return this.api.get<ArticleCategory>(`${this.url}/${id}`);
  }

  getAll(): Observable<ArticleCategory[]> {
    return this.api.get<ArticleCategory[]>(this.url);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.url}/${id}`);
  }
}
