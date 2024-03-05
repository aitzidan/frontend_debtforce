import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarWorkflowComponent } from './bar-workflow.component';

describe('BarWorkflowComponent', () => {
  let component: BarWorkflowComponent;
  let fixture: ComponentFixture<BarWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
