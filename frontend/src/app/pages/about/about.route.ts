import { Routes } from '@angular/router';
import { AboutComponent } from './about.component';

export const ROUTE: Routes = [
    { path: 'about', component: AboutComponent, data: { pageTitle: 'О проекте - IdeaForYou' } }
];
