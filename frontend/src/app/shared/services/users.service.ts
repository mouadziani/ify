import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { ApiRequestService } from '../api/api-request.service';

@Injectable()
export class UsersService {

  constructor(private api: ApiRequestService) {}

  registerNewUser(user: User) {
    return this.api.post('registration', user);
  }
}