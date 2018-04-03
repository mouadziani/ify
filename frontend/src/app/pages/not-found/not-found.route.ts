import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

export const ROUTES: Routes = [
    { path: '**', component: NotFoundComponent },
    { path: '404', component: NotFoundComponent }
];
