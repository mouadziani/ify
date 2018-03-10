import { Component } from '@angular/core';
import { Principal } from '../../shared/auth/principal.service';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/auth/login.service';

@Component({
  selector: 'ify-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(
    private loginService: LoginService,
    private principal: Principal,
    private router: Router
  ) {}

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
