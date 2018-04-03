import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

export const ROUTES: Routes = [
    { path: '**', component: NotFoundComponent, data: { pageTitle: '404 - IdeaForYou' } },
    { path: '404', component: NotFoundComponent, data: { pageTitle: '404 - IdeaForYou' } }
];
