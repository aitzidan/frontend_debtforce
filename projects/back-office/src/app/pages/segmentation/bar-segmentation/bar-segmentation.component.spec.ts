import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarSegmentationComponent } from './bar-segmentation.component';

describe('BarSegmentationComponent', () => {
  let component: BarSegmentationComponent;
  let fixture: ComponentFixture<BarSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarSegmentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
