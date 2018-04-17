import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/user/user.model';
import { Account } from '../../shared/user/account.model';
import { Principal } from '../../shared/auth/principal.service';
import { UserService } from '../../shared/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'ify-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: User;
  currentAccount: Account;

  constructor(
    private principal: Principal,
    private userService: UserService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => this.currentAccount = account);
    this.activedRoute.params.subscribe(params => {
      this.userService.find(params['login']).subscribe(user => {
        this.user = user;
        this.title.setTitle(user.login + ' - IdeaForYou');
      }, () => this.router.navigate(['/404']));
    });
  }
}
