import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateWorkflowComponent } from './generate-workflow.component';

describe('GenerateWorkflowComponent', () => {
  let component: GenerateWorkflowComponent;
  let fixture: ComponentFixture<GenerateWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
