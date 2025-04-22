import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionValuesComponent } from './nutrition-values.component';

describe('NutritionValuesComponent', () => {
  let component: NutritionValuesComponent;
  let fixture: ComponentFixture<NutritionValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionValuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
