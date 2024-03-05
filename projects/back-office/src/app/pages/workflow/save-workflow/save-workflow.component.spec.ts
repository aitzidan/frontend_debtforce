import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveWorkflowComponent } from './save-workflow.component';

describe('SaveWorkflowComponent', () => {
  let component: SaveWorkflowComponent;
  let fixture: ComponentFixture<SaveWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
