import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'ify-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

  constructor(
    private titleService: Title,
    private router: Router
  ) {}

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'IdeaForYou';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
      }
    });
  }
}
