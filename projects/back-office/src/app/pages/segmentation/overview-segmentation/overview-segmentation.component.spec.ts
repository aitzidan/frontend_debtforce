import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSegmentationComponent } from './overview-segmentation.component';

describe('OverviewSegmentationComponent', () => {
  let component: OverviewSegmentationComponent;
  let fixture: ComponentFixture<OverviewSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewSegmentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
