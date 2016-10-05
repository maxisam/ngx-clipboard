import { Routes } from '@angular/router';
import { Home } from './home/home';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home }
];

