import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import {UsersService} from '../../shared/services/users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Регистрация');
    meta.addTags([
      { name: 'keywords', content: 'регистрация' },
      { name: 'description', content: 'Регистрация на IdeaForYou' }
    ]);
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'username': new FormControl(null, [Validators.required]),
      'firstname': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const { email, password, username, firstname, lastname} = this.form.value;
    const user = new User(username, firstname, lastname, email, password);
    this.usersService.registerNewUser(user)
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
