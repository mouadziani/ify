import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from '../api/base-api.service';

@Injectable()
export class UserService {

  private url = 'api/users';

  constructor(private api: BaseApiService) { }

  create(user: User): Observable<HttpResponse<User>> {
    return this.api.post<User>(this.url, user);
  }

  update(user: User): Observable<any> {
    return this.api.put(this.url, user);
  }

  find(login: string): Observable<User> {
    return this.api.get<User>(`${this.url}/${login}`);
  }

  query(req?: any): Observable<HttpResponse<User[]>> {
    return this.api.getWithPagination<User[]>(this.url, req);
  }

  delete(login: string): Observable<HttpResponse<any>> {
    return this.api.delete(`${this.url}/${login}`);
  }

  changeImage(req: any): Observable<any> {
    return this.api.post('api/account/change-image', req);
  }

  changePassword(req: any): Observable<any> {
    return this.api.post('api/account/change-password', req);
  }

  updateUser(req: any): Observable<any> {
    return this.api.post('api/account', req);
  }

  authorities(): Observable<string[]> {
    return this.api.get<string[]>('api/users/authorities');
  }
}
