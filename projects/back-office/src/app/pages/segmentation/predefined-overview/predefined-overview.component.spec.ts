import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedOverviewComponent } from './predefined-overview.component';

describe('PredefinedOverviewComponent', () => {
  let component: PredefinedOverviewComponent;
  let fixture: ComponentFixture<PredefinedOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredefinedOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredefinedOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
