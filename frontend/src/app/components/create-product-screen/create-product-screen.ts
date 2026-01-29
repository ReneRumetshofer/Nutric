import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import { Location } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Unit,
  ServingUnit,
  UnitMapping,
  ServingUnitMapping,
  mapUnitToGerman,
} from '../../data/models/product.model';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { NumberUnitInputComponent } from '../shared/number-unit-input/number-unit-input.component';
import { Button } from 'primeng/button';
import { conditionalValidator } from '../../utils/validation.utils';

@Component({
  selector: 'app-create-product-screen',
  imports: [
    PageHeaderComponent,
    ReactiveFormsModule,
    InputText,
    FloatLabel,
    Select,
    NumberUnitInputComponent,
    Button,
  ],
  templateUrl: './create-product-screen.html',
  styleUrl: './create-product-screen.scss',
})
export class CreateProductScreen {
  protected productNameControl = new FormControl('', Validators.required);
  protected producerControl = new FormControl('');
  protected baseUnitControl = new FormControl(Unit.GRAMS, Validators.required);
  protected caloriesPerHundredControl = new FormControl(null, [
    Validators.required,
    Validators.min(0),
  ]);
  protected proteinPerHundredControl = new FormControl(null, [
    Validators.required,
    Validators.min(0),
  ]);
  protected carbsPerHundredControl = new FormControl(null, [
    Validators.required,
    Validators.min(0),
  ]);
  protected fatPerHundredControl = new FormControl(null, [
    Validators.required,
    Validators.min(0),
  ]);
  protected servingUnitControl = new FormControl(null);
  protected servingSizeControl = new FormControl(
    { value: null, disabled: this.servingUnitControl.value === null },
    conditionalValidator(
      () => this.servingUnitControl.value !== null,
      Validators.compose([Validators.min(0), Validators.required]),
    ),
  );

  protected form: FormGroup = new FormGroup({
    productName: this.productNameControl,
    producer: this.producerControl,
    baseUnit: this.baseUnitControl,
    caloriesPerHundred: this.caloriesPerHundredControl,
    proteinPerHundred: this.proteinPerHundredControl,
    carbsPerHundred: this.carbsPerHundredControl,
    fatPerHundred: this.fatPerHundredControl,
    servingUnit: this.servingUnitControl,
    servingSize: this.servingSizeControl,
  });

  protected baseUnitOptions = [Unit.GRAMS, Unit.MILLILITERS].map((unit) => ({
    label: UnitMapping[unit],
    value: unit,
  }));

  protected servingUnitOptions = Object.values(ServingUnit)
    .filter(
      (unit) => unit !== ServingUnit.GRAMS && unit !== ServingUnit.MILLILITERS,
    )
    .map((unit) => ({
      label: ServingUnitMapping[unit],
      value: unit,
    }));

  constructor(private location: Location) {
    this.servingUnitControl.valueChanges.subscribe((value) => {
      if (value === null) {
        this.servingSizeControl.disable({ emitEvent: false });
        this.servingSizeControl.setValue(null, { emitEvent: false });
      } else {
        this.servingSizeControl.enable({ emitEvent: false });
      }
    });
  }

  onBack(): void {
    this.location.back();
  }

  onSave(): void {}

  protected readonly mapUnitToGerman = mapUnitToGerman;
}
