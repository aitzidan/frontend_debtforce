import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccordComponent } from './add-accord.component';

describe('AddAccordComponent', () => {
  let component: AddAccordComponent;
  let fixture: ComponentFixture<AddAccordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
