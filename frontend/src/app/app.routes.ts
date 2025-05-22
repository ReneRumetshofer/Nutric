import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { isAuthenticated } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [isAuthenticated] },
  {
    path: 'track',
    loadComponent: () =>
      import('./components/track-food-screen/track-food-screen.component').then(
        (m) => m.TrackFoodScreenComponent,
      ),
    canActivate: [isAuthenticated],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
    canActivate: [isAuthenticated],
  },
];
