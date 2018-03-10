import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
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

  get<T>(url: string) {
    return this.http.get<T>(url);
  }
}
