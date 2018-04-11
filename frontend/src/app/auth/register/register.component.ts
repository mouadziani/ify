import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../shared/auth/register.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ify-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private registerService: RegisterService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[_\'.@A-Za-z0-9-]*$')
      ]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50)
      ]),
      'repeat-password': new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit() {
    const values = this.form.value;
    this.registerService.save({
      login: values.login,
      email: values.email,
      password: values.password
    }).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
