import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWorkflowToQueueComponent } from './assign-workflow-to-queue.component';

describe('AssignWorkflowToQueueComponent', () => {
  let component: AssignWorkflowToQueueComponent;
  let fixture: ComponentFixture<AssignWorkflowToQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignWorkflowToQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignWorkflowToQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
