import {HttpClient, HttpHeaders, HttpResponse, HttpXsrfTokenExtractor} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SERVER_API_URL } from '../../app.constants';
import { BaseApiService } from '../api/base-api.service';

@Injectable()
export class AuthServerProvider {

  constructor(private api: BaseApiService, private http: HttpClient, private tokenExtractor: HttpXsrfTokenExtractor) {}

  login(credentials): Observable<any> {
    const data = 'username=' + encodeURIComponent(credentials.username) +
      '&password=' + encodeURIComponent(credentials.password) +
      '&remember-me=' + credentials.rememberMe + '&submit=Login';
    return this.http.post(SERVER_API_URL + 'api/authentication', data, {
      headers: new HttpHeaders({
        'X-XSRF-TOKEN': this.tokenExtractor.getToken(),
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
  }

  logout(): Observable<any> {
    return this.api.post('api/logout', {}).map((response: HttpResponse<any>) => {
      this.api.get('api/account').subscribe(() => {}, () => {});
      return response;
    });
  }
}
