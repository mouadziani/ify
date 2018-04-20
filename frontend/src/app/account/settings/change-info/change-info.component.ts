import { Component, OnInit } from '@angular/core';
import { Principal } from '../../../shared/auth/principal.service';
import { UserService } from '../../../shared/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/user/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ify-change-info',
  templateUrl: './change-info.component.html'
})
export class ChangeInfoComponent implements OnInit {

  form: FormGroup;
  currentUser: User;

  constructor(
    private principal: Principal,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.principal.identity().then(user => {
      this.currentUser = user;
      this.form = new FormGroup({
        'email': new FormControl(user.email, [
          Validators.required,
          Validators.email,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]),
        'firstName': new FormControl(user.firstName, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]),
        'lastName': new FormControl(user.lastName, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ])
      });
    });
  }

  onSubmit() {
    const values = this.form.value;
    this.currentUser.firstName = values.firstName;
    this.currentUser.lastName = values.lastName;
    this.currentUser.email = values.email;
    this.userService.updateUser(this.currentUser)
      .subscribe(() => this.router.navigate(['/account', this.currentUser.login]));
  }
}
