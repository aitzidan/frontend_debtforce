import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelFacturationComponent } from './add-model-facturation.component';

describe('AddModelFacturationComponent', () => {
  let component: AddModelFacturationComponent;
  let fixture: ComponentFixture<AddModelFacturationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModelFacturationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModelFacturationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
