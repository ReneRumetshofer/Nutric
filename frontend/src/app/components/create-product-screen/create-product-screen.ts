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
import { InputNumber } from 'primeng/inputnumber';
import { NumberUnitInputComponent } from '../shared/number-unit-input/number-unit-input.component';

@Component({
  selector: 'app-create-product-screen',
  imports: [
    PageHeaderComponent,
    ReactiveFormsModule,
    InputText,
    FloatLabel,
    Select,
    InputNumber,
    NumberUnitInputComponent,
  ],
  templateUrl: './create-product-screen.html',
  styleUrl: './create-product-screen.scss',
})
export class CreateProductScreen implements OnInit {
  protected productNameControl = new FormControl('', Validators.required);
  protected producerControl = new FormControl('');
  protected baseUnitControl = new FormControl(Unit.GRAMS, Validators.required);
  protected caloriesPerHundredControl = new FormControl(0, Validators.required);
  protected proteinPerHundredControl = new FormControl(0, Validators.required);
  protected carbsPerHundredControl = new FormControl(0, Validators.required);
  protected fatPerHundredControl = new FormControl(0, Validators.required);
  protected servingUnitControl = new FormControl(null);
  protected servingSizeControl = new FormControl(null);

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

  constructor(private location: Location) {}

  ngOnInit(): void {}

  onBack(): void {
    this.location.back();
  }

  protected readonly mapUnitToGerman = mapUnitToGerman;
}
