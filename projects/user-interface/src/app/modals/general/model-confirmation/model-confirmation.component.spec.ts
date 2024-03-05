import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConfirmationComponent } from './model-confirmation.component';

describe('ModelConfirmationComponent', () => {
  let component: ModelConfirmationComponent;
  let fixture: ComponentFixture<ModelConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
