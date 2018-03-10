import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseApiService } from '../api/base-api.service';

@Injectable()
export class RegisterService {

  constructor(private api: BaseApiService) {}

  save(account: any): Observable<any> {
    return this.api.post('api/register', account);
  }
}
