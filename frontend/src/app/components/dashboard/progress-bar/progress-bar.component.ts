import { Component, Input } from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  imports: [ProgressBar, NgClass],
  templateUrl: './progress-bar.component.html',
  standalone: true,
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() unit: string = '';
  @Input() height: string | undefined;
  @Input() showValue: boolean = true;
  @Input() valueClass: string = 'text-sm';

  get heightStyle(): any {
    if (!this.height) {
      return { height: '0.5rem' };
    }
    return { height: this.height };
  }
}
