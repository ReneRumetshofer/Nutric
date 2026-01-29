import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberUnitInputComponent } from './number-unit-input.component';

describe('NumberUnitInputComponent', () => {
  let component: NumberUnitInputComponent;
  let fixture: ComponentFixture<NumberUnitInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberUnitInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberUnitInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
