import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpXsrfTokenExtractor} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

@Injectable()
export class BaseApiService {

  constructor(private http: HttpClient, private tokenExtractor: HttpXsrfTokenExtractor) {}

  post<T>(url: string, data: any): Observable<any> {
    return this.http.post<T>(SERVER_API_URL + url, data, {
      headers: new HttpHeaders({
        'X-XSRF-TOKEN': this.tokenExtractor.getToken()
      })
    });
  }

  getWithPagination<T>(url: string, req?: any): Observable<any> {
    const options = this.createRequestOption(req);
    return this.http.get<T>(SERVER_API_URL + url, { params: options, observe: 'response' });
  }

  get<T>(url: string): Observable<any> {
    return this.http.get<T>(SERVER_API_URL + url);
  }

  put<T>(url: string, data: any): Observable<any> {
    return this.http.put<T>(SERVER_API_URL + url, data);
  }

  delete<T>(url: string): Observable<any> {
    return this.http.delete<T>(SERVER_API_URL + url);
  }

  private createRequestOption(req?: any): HttpParams {
    let options: HttpParams = new HttpParams();
    if (req) {
      Object.keys(req).forEach((key) => {
        if (key !== 'sort') {
          options = options.set(key, req[key]);
        }
      });
      if (req.sort) {
        req.sort.forEach((val) => {
          options = options.append('sort', val);
        });
      }
    }
    return options;
  }
}
