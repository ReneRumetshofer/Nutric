import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import MealType from '../../models/meal-type.enum';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-track-food-screen',
  imports: [Button],
  templateUrl: './track-food-screen.component.html',
  standalone: true,
  styleUrl: './track-food-screen.component.scss',
})
export class TrackFoodScreenComponent implements OnInit {
  day: string | null = null;
  mealType: MealType | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.day = params['day'];
      this.mealType = params['mealType'];
    });
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
