import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSegmentationComponent } from './create-segmentation.component';

describe('CreateSegmentationComponent', () => {
  let component: CreateSegmentationComponent;
  let fixture: ComponentFixture<CreateSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSegmentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
