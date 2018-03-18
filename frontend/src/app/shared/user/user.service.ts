import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from '../api/base-api.service';

@Injectable()
export class UserService {

  private resourceUrl = 'api/users';

  constructor(private api: BaseApiService) { }

  create(user: User): Observable<HttpResponse<User>> {
    return this.api.post<User>(this.resourceUrl, user);
  }

  update(user: User): Observable<any> {
    return this.api.put(this.resourceUrl, user);
  }

  find(login: string): Observable<User> {
    return this.api.get<User>(`${this.resourceUrl}/${login}`);
  }

  delete(login: string): Observable<HttpResponse<any>> {
    return this.api.delete(`${this.resourceUrl}/${login}`);
  }

  authorities(): Observable<string[]> {
    return this.api.get<string[]>('api/users/authorities');
  }
}
