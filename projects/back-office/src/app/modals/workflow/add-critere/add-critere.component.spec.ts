import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCritereComponent } from './add-critere.component';

describe('AddCritereComponent', () => {
  let component: AddCritereComponent;
  let fixture: ComponentFixture<AddCritereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCritereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCritereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
