import { Component, OnInit } from '@angular/core';
import { Principal } from '../../shared/auth/principal.service';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/auth/login.service';
import { Account } from '../../shared/user/account.model';

@Component({
  selector: 'ify-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  currentAccount: Account;

  constructor(
    private loginService: LoginService,
    private principal: Principal,
    private router: Router
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => this.currentAccount = account);
  }

  isAuthenticated() {
    return this.principal.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.principal.getImageUrl() : null;
  }
}
