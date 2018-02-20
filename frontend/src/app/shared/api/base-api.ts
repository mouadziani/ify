import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {BASE_API_URL, BASE_AUTH_URL} from '../base-api-url.default';
import {Injectable} from "@angular/core";

@Injectable()
export class BaseApi {

  private baseUrl = BASE_API_URL;

  constructor(public http: HttpClient) {}

  private getUrl(url: string = '') {
    return this.baseUrl + url;
  }

  public get(url: string = ''): Observable<any> {
    return this.http.get(this.getUrl(url))
      .map((response) => JSON.parse(response.toString()));
  }

  public post(url: string = '', data: any = {}): Observable<any> {
    return this.http.post(this.getUrl(url), data)
      .map((response) => JSON.parse(response.toString()));
  }

  public put(url: string = '', data: any = {}): Observable<any> {
    return this.http.put(this.getUrl(url), data)
      .map((response) => JSON.parse(response.toString()));
  }
}
