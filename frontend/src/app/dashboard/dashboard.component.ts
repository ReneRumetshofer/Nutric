import { Component } from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { Tag } from 'primeng/tag';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { MealCardComponent } from './meal-card/meal-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    ProgressBar,
    ProgressBarComponent,
    Tag,
    Card,
    Button,
    MealCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
