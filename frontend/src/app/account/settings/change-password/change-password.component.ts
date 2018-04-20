import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../shared/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ify-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
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
    this.userService.changePassword(this.form.value.password)
      .subscribe(() => this.router.navigate(['']));
  }
}
