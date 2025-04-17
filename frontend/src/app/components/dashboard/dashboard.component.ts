import { Component, OnInit } from '@angular/core';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { Tag } from 'primeng/tag';
import { MealCardComponent } from './meal-card/meal-card.component';
import { Router } from '@angular/router';
import MealType from '../../models/meal-type.enum';
import ProfileService from '../../services/profile.service';
import DayService from '../../services/day.service';

@Component({
  selector: 'app-dashboard',
  imports: [ProgressBarComponent, Tag, MealCardComponent],
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    protected dayService: DayService,
  ) {}

  ngOnInit(): void {
    this.dayService.fetchDay(new Date(Date.now()));
  }

  onAddFood(mealType: MealType) {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    this.router.navigate(['/track'], {
      queryParams: {
        day: `${year}-${month}-${day}`,
        mealType: mealType,
      },
    });
  }

  protected readonly MealType = MealType;
}
