import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private resourceUrl = SERVER_API_URL + 'api/users';

  constructor(private http: HttpClient) { }

  create(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.resourceUrl, user, { observe: 'response' });
  }

  update(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(this.resourceUrl, user, { observe: 'response' });
  }

  find(login: string): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }

  delete(login: string): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.resourceUrl}/${login}`, { observe: 'response' });
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
  }
}
