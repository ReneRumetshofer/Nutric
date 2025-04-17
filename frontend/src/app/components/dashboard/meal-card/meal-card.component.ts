import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { Panel } from 'primeng/panel';
import {Divider} from 'primeng/divider';

@Component({
  selector: 'app-meal-card',
  imports: [Card, Button, ProgressBarComponent, Panel, Divider],
  templateUrl: './meal-card.component.html',
  standalone: true,
  styleUrl: './meal-card.component.scss',
})
export class MealCardComponent {
  @Input({ required: true }) mealName: string = '';
  @Input() calories: number = 0;
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();
}
