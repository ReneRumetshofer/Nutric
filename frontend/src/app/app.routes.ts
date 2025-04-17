import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrackFoodScreenComponent } from './components/track-food-screen/track-food-screen.component';
import {isAuthenticated} from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [isAuthenticated] },
  { path: 'track', component: TrackFoodScreenComponent, canActivate: [isAuthenticated] },
];
