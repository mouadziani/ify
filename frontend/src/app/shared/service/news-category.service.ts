import { Injectable } from "@angular/core";
import { BaseApiService } from "../api/base-api.service";
import { NewsCategory } from "../model/news-category.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class NewsCategoryService {

  private url = 'api/news-category';

  constructor(private api: BaseApiService) {}

  create(articleCategory: NewsCategory): Observable<any> {
    return this.api.post(this.url, articleCategory);
  }

  update(articleCategory: NewsCategory): Observable<any> {
    return this.api.put(this.url, articleCategory);
  }

  find(id: number): Observable<NewsCategory> {
    return this.api.get<NewsCategory>(`${this.url}/${id}`);
  }

  getAll(): Observable<NewsCategory[]> {
    return this.api.get<NewsCategory[]>(this.url);
  }

  delete(id: number): Observable<any> {
    return this.api.delete(`${this.url}/${id}`);
  }
}
