import { Injectable } from '@angular/core';
import { BaseApiService } from '../api/base-api.service';
import { Observable } from 'rxjs/Observable';
import { HttpResponse } from '@angular/common/http';
import { Blog } from '../model/blog.model';

@Injectable()
export class BlogService {

  private url = 'api/blog';

  constructor(private api: BaseApiService) {}

  create(article: Blog): Observable<Blog> {
    return this.api.post<Blog>(this.url, article);
  }

  update(article: Blog): Observable<any> {
    return this.api.put(this.url, article);
  }

  find(id: number): Observable<Blog> {
    return this.api.get<Blog>(`${this.url}/${id}`);
  }

  query(req?: any): Observable<HttpResponse<Blog[]>> {
    return this.api.getWithPagination<Blog[]>(this.url, req);
  }

  queryByUser(login: string, req?: any): Observable<HttpResponse<Blog[]>> {
    return this.api.getWithPagination<Blog[]>(`${this.url}/user/${login}`, req);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.url}/${id}`);
  }
}
