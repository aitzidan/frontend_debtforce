import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelcouriermodalComponent } from './modelcouriermodal.component';

describe('ModelcouriermodalComponent', () => {
  let component: ModelcouriermodalComponent;
  let fixture: ComponentFixture<ModelcouriermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelcouriermodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelcouriermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
