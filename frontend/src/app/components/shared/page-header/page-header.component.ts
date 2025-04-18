import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-page-header',
  imports: [Button],
  templateUrl: './page-header.component.html',
  standalone: true,
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  @Input() headerTitle: string | undefined;
  @Output() onBack: EventEmitter<void> = new EventEmitter<void>();
}
