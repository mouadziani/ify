import { Injectable } from '@angular/core';

export interface UserInStorage {
  username: string;
  email: string;
  displayName: string;
  token: string;
}

export interface LoginInfoInStorage {
  success: boolean;
  message: string;
  landingPage: string;
  user?: UserInStorage;
}

@Injectable()
export class UserInfoService {

  public currentUserKey = 'currentUser';

  public storage: Storage = sessionStorage;

  storeUserInfo(userInfoString: string) {
    this.storage.setItem(this.currentUserKey, userInfoString);
  }

  removeUserInfo() {
    this.storage.removeItem(this.currentUserKey);
  }

  getUserInfo(): UserInStorage | null {
    try {
      const userInfoString: string = this.storage.getItem(this.currentUserKey);
      if (userInfoString) {
        const userObj: UserInStorage = JSON.parse(this.storage.getItem(this.currentUserKey));
        return userObj;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.storage.getItem(this.currentUserKey);
  }

  getUserName(): string {
    const userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.displayName;
    }
    return 'no-user';
  }

  getStoredToken(): string | null {
    const userObj: UserInStorage = this.getUserInfo();
    if (userObj !== null) {
      return userObj.token;
    }
    return null;
  }
}
