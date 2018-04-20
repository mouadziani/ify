import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user/user.service';
import { Principal } from '../../../shared/auth/principal.service';
import { User } from '../../../shared/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ify-change-image',
  templateUrl: './change-image.component.html'
})
export class ChangeImageComponent implements OnInit {

  image: string;

  constructor(
    private userService: UserService,
    private principal: Principal,
    private router: Router
  ) {}

  ngOnInit() {
    this.principal.identity().then(account => {
      this.userService.find(account.login).subscribe(user => this.image = user.image);
    });
  }

  saveImg($event) {
    const reader: FileReader = new FileReader();
    reader.onloadend = () => {
      this.image = reader.result;
      this.userService.changeImage(this.image).subscribe();
      this.router.navigate(['']).then(() => window.location.reload());
    };
    reader.readAsDataURL($event.target.files[0]);
  }
}
