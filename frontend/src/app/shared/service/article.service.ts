import { Injectable } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { Article } from '../model/article.model';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class ArticleService {

  private url = 'api/article';

  constructor(private api: BaseApiService) {}

  create(article: Article): Observable<Article> {
    return this.api.post<Article>(this.url, article);
  }

  update(article: Article): Observable<any> {
    return this.api.put(this.url, article);
  }

  find(id: number): Observable<Article> {
    return this.api.get<Article>(`${this.url}/${id}`);
  }

  query(req?: any): Observable<HttpResponse<Article[]>> {
    return this.api.getWithPagination<Article[]>(this.url, req);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.url}/${id}`);
  }
}
