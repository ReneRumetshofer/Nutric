import { Component, effect } from '@angular/core';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import { Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProfileNumberInputComponent } from './profile-number-input/profile-number-input.component';
import { Button } from 'primeng/button';
import ProfileService from '../../services/profile.service';
import { UpdateProfileRequest } from '../../data/requests/update-profile-request.model';
import { firstValueFrom } from 'rxjs';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-profile',
  imports: [
    PageHeaderComponent,
    ReactiveFormsModule,
    ProfileNumberInputComponent,
    Button,
    Toast,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  form: FormGroup = new FormGroup({
    weight: new FormArray([]),
    calorieGoal: new FormArray([]),
    carbLimitGrams: new FormArray([]),
    proteinLimitGrams: new FormArray([]),
    fatLimitGrams: new FormArray([]),
  });

  constructor(
    private fb: FormBuilder,
    protected profileService: ProfileService,
    private router: Router,
  ) {
    this.constructForm();

    if (!this.profileService.profile$()) {
      this.profileService.fetchProfile();
    }

    effect(() => {
      const profile = this.profileService.profile$();
      if (!profile) {
        return;
      }

      const formValue = {
        weight: profile.weight,
        calorieGoal: profile.calorieGoal,
        proteinLimitGrams: profile.proteinLimitGrams,
        fatLimitGrams: profile.fatLimitGrams,
        carbLimitGrams: profile.carbLimitGrams,
      };
      this.form.setValue(formValue);
    });
  }

  constructForm(): void {
    this.form = this.fb.group({
      weight: [
        '1',
        [Validators.required, Validators.min(1), Validators.max(500)],
      ],
      calorieGoal: ['', [Validators.required, Validators.min(1)]],
      proteinLimitGrams: ['', [Validators.required, Validators.min(1)]],
      fatLimitGrams: ['', [Validators.required, Validators.min(1)]],
      carbLimitGrams: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onBack(): void {
    this.router.navigate(['/']);
  }

  async onSave(): Promise<void> {
    const updateRequest = this.form.getRawValue() as UpdateProfileRequest;
    await firstValueFrom(this.profileService.updateProfile(updateRequest));
  }

  get weightControl(): FormControl {
    return this.form.get('weight') as FormControl;
  }

  get calorieGoalControl(): FormControl {
    return this.form.get('calorieGoal') as FormControl;
  }

  get proteinGramsControl(): FormControl {
    return this.form.get('proteinLimitGrams') as FormControl;
  }

  get fatGramsControl(): FormControl {
    return this.form.get('fatLimitGrams') as FormControl;
  }

  get carbGramsControl(): FormControl {
    return this.form.get('carbLimitGrams') as FormControl;
  }
}
