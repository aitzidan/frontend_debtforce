import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSegmentationComponent } from './update-segmentation.component';

describe('UpdateSegmentationComponent', () => {
  let component: UpdateSegmentationComponent;
  let fixture: ComponentFixture<UpdateSegmentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSegmentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSegmentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
