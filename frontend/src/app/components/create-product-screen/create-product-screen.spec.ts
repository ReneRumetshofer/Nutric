import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductScreen } from './create-product-screen';

describe('CreateProductScreen', () => {
  let component: CreateProductScreen;
  let fixture: ComponentFixture<CreateProductScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductScreen);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
