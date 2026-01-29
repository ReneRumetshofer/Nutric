import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-page-header',
  imports: [Button, Menu],
  templateUrl: './page-header.component.html',
  standalone: true,
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  @Input() headerTitle: string | undefined;
  @Input() menuItems: MenuItem[] | undefined;
  @Output() onBack: EventEmitter<void> = new EventEmitter<void>();
}
