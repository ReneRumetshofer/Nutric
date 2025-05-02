import { Component, Input } from '@angular/core';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputNumber } from 'primeng/inputnumber';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-profile-number-input',
  imports: [
    FloatLabel,
    InputGroup,
    InputGroupAddon,
    InputNumber,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-number-input.component.html',
  styleUrl: './profile-number-input.component.scss',
})
export class ProfileNumberInputComponent {
  @Input() control!: FormControl;
  @Input() inputId!: string;
  @Input() label: string = '';
  @Input() postfix: string | null = null;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() minFractionDigits: number | null = null;
  @Input() maxFractionDigits: number | null = null;
}
