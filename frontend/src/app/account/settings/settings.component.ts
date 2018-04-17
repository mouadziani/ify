import { Component, OnInit } from '@angular/core';
import { Principal } from '../../shared/auth/principal.service';

@Component({
  selector: 'ify-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  currentAccount: Account;

  constructor(private principal: Principal) {}

  ngOnInit() {
    this.principal.identity().then(account => this.currentAccount = account);
  }
}
