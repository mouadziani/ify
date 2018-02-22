import { UserInfoService } from '../services/user-info.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { BASE_API_URL } from '../base-api-url.default';

@Injectable()
export class ApiRequestService {

  private baseApiPath = BASE_API_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userInfoService: UserInfoService
  ) {}

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.userInfoService.getStoredToken();
    headers = headers.append('Content-Type', 'application/json');
    if (token !== null) {
      headers = headers.append('Authorization', token);
    }
    return headers;
  }

  get(url: string, urlParams?: HttpParams): Observable<any> {
    const me = this;
    return this.http.get(this.baseApiPath + url, {headers: this.getHeaders(),  params: urlParams} )
      .catch((error: any) => {
        console.log('Some error in catch');
        if (error.status === 401 || error.status === 403) {
          me.router.navigate(['/logout']);
        }
        return null;
      });
  }

  post(url: string, body: Object): Observable<any> {
    const me = this;
    return this.http.post(this.baseApiPath + url, JSON.stringify(body), { headers: this.getHeaders()});
  }

  put(url: string, body: Object): Observable<any> {
    const me = this;
    return this.http.put(this.baseApiPath + url, JSON.stringify(body), { headers: this.getHeaders()})
      .catch((error: any) => {
        if (error.status === 401) {
          me.router.navigate(['/logout']);
        }
        return null;
      });
  }

  delete(url: string): Observable<any> {
    const me = this;
    return this.http.delete(this.baseApiPath + url, { headers: this.getHeaders()})
      .catch((error: any) => {
        if (error.status === 401) {
          me.router.navigate(['/logout']);
        }
        return null;
      });
  }

}
