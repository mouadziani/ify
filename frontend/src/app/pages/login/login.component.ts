import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  model: any = {};

  errMsg = '';

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.logout(false);
  }

  login() {
    this.loginService.getToken(this.model.username, this.model.password)
      .subscribe(resp => {
          console.log(resp);
          if (resp.user === undefined || resp.user.token === undefined || resp.user.token === 'INVALID' ) {
            this.errMsg = 'Username or password is incorrect';
            return;
          }
          this.router.navigate([resp.landingPage]);
        },
        errResponse => {
          console.log(errResponse);
          switch (errResponse.status) {
            case 401:
              this.errMsg = 'Username or password is incorrect';
              break;
            case 404:
              this.errMsg = 'Service not found';
              break;
            case 408:
              this.errMsg = 'Request Timedout';
              break;
            case 500:
              this.errMsg = 'Internal Server Error';
              break;
            default:
              this.errMsg = 'Server Error';
          }
        }
      );
  }

  onSignUp() {
    this.router.navigate(['/']);
  }
}
