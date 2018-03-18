import { Injectable } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { News } from '../model/news.model';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class NewsService {

  private url = 'api/news';

  constructor(private api: BaseApiService) {}

  create(news: News): Observable<any> {
    return this.api.post(this.url, news);
  }

  update(news: News): Observable<any> {
    return this.api.put(this.url, news);
  }

  find(id: number): Observable<News> {
    return this.api.get<News>(`${this.url}/${id}`);
  }

  query(req?: any): Observable<HttpResponse<News[]>> {
    return this.api.getWithPagination<News[]>(this.url, req);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.url}/${id}`);
  }
}
