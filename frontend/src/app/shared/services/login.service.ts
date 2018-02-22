import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ApiRequestService } from '../api/api-request.service';
import { LoginInfoInStorage, UserInfoService } from './user-info.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

export interface LoginRequestParam {
  username: string;
  password: string;
}

@Injectable()
export class LoginService {

  public landingPage = '/home/dashboard/order';

  constructor(
    private router: Router,
    private userInfoService: UserInfoService,
    private apiRequest: ApiRequestService
  ) {}

  getToken(username: string, password: string): Observable<any> {
    const me = this;

    const bodyData: LoginRequestParam = {
      'username': username,
      'password': password
    };
    const loginDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    let loginInfoReturn: LoginInfoInStorage;
    this.apiRequest.post('session', bodyData)
      .subscribe(jsonResp => {
          if (jsonResp !== undefined && jsonResp !== null && jsonResp.operationStatus === 'SUCCESS') {
            loginInfoReturn = {
              'success': true,
              'message': jsonResp.operationMessage,
              'landingPage': this.landingPage,
              'user': {
                'username': jsonResp.item.username,
                'email': jsonResp.item.email,
                'displayName': jsonResp.item.firstName + ' ' + jsonResp.item.lastName,
                'token': jsonResp.item.token,
              }
            };
            this.userInfoService.storeUserInfo(JSON.stringify(loginInfoReturn.user));
          } else {
            loginInfoReturn = {
              'success': false,
              'message': jsonResp.msgDesc,
              'landingPage': '/login'
            };
          }
          loginDataSubject.next(loginInfoReturn);
        },
        err => {
          loginInfoReturn = {
            'success': false,
            'message': err.url + ' >>> ' + err.statusText +  '[' + err.status + ']',
            'landingPage': '/login'
          };
        });

    return loginDataSubject;
  }

  logout(navigatetoLogout = true): void {
    this.userInfoService.removeUserInfo();
    if (navigatetoLogout) {
      this.router.navigate(['logout']);
    }
  }
}
