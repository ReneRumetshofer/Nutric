import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-value',
  imports: [],
  templateUrl: './data-value.component.html',
  standalone: true,
  styleUrl: './data-value.component.scss',
})
export class DataValueComponent {
  @Input() value: any = null;
  @Input() unit: string | null = null;
  @Input() caption: string = '';
}
