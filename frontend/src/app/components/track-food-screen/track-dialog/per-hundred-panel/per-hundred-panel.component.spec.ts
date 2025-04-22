import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerHundredPanelComponent } from './per-hundred-panel.component';

describe('PerHundredPanelComponent', () => {
  let component: PerHundredPanelComponent;
  let fixture: ComponentFixture<PerHundredPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerHundredPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerHundredPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
