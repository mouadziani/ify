import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../shared/services/user-info.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public userInfoService: UserInfoService) { }

  ngOnInit() {
  }

}
