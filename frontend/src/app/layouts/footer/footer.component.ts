import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ify-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  year: string;

  constructor() { }

  ngOnInit() {
    this.year = new Date().getFullYear().toString();
  }

}
