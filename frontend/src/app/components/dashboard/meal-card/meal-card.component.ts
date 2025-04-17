import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Panel } from 'primeng/panel';
import { Divider } from 'primeng/divider';

@Component({
  selector: 'app-meal-card',
  imports: [Button, Panel, Divider],
  templateUrl: './meal-card.component.html',
  standalone: true,
  styleUrl: './meal-card.component.scss',
})
export class MealCardComponent {
  @Input({ required: true }) mealName: string = '';
  @Input() calories: number = 0;
  @Output() onAdd: EventEmitter<void> = new EventEmitter<void>();
}
