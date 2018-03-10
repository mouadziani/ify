import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../shared/auth/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ify-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'rememberMe': new FormControl(true)
    });
  }

  onSubmit() {
    const formData = this.form.value;
    this.loginService.login({
      username: formData.username,
      password: formData.password,
      rememberMe: formData.rememberMe
    }).then(() => {
      this.router.navigate(['']);
    });
  }
}
