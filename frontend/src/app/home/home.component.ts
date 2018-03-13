import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ify-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  carouselPosts = [1, 2, 3];

  mainPosts = [1, 2, 3, 4, 5, 6];

  newsPosts = [1, 2, 3, 4, 5, 6, 7, 8];

  reviewPosts = [1, 2, 3, 4, 5, 6];

  videoPosts = [1, 2, 3, 4];

  constructor() { }

  ngOnInit() {
  }

}
