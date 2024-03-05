import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferStepComponent } from './transfer-step.component';

describe('TransferStepComponent', () => {
  let component: TransferStepComponent;
  let fixture: ComponentFixture<TransferStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
