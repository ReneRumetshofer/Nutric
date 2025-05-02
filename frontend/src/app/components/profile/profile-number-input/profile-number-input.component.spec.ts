import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNumberInputComponent } from './profile-number-input.component';

describe('ProfileNumberInputComponent', () => {
  let component: ProfileNumberInputComponent;
  let fixture: ComponentFixture<ProfileNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileNumberInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
