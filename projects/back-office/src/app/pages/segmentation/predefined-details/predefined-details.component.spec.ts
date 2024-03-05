import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedDetailsComponent } from './predefined-details.component';

describe('PredefinedDetailsComponent', () => {
  let component: PredefinedDetailsComponent;
  let fixture: ComponentFixture<PredefinedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredefinedDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
