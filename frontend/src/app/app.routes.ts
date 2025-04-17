import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TrackFoodScreenComponent } from './components/track-food-screen/track-food-screen.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'track', component: TrackFoodScreenComponent },
];
