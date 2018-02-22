import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../shared/services/user-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userInfoService: UserInfoService) { }

  ngOnInit() {
  }
}
