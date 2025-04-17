import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFoodScreenComponent } from './track-food-screen.component';

describe('TrackFoodScreenComponent', () => {
  let component: TrackFoodScreenComponent;
  let fixture: ComponentFixture<TrackFoodScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackFoodScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackFoodScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
