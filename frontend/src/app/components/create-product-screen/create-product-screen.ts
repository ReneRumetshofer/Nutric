import { Component, OnInit } from '@angular/core';
import { PageHeaderComponent } from '../shared/page-header/page-header.component';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Unit } from '../../data/models/product.model';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-create-product-screen',
  imports: [PageHeaderComponent, ReactiveFormsModule, InputText, FloatLabel],
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

  constructor(private location: Location) {}

  ngOnInit(): void {}

  onBack(): void {
    this.location.back();
  }
}
