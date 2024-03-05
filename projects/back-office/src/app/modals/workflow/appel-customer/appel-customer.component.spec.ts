import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppelCustomerComponent } from './appel-customer.component';

describe('AppelCustomerComponent', () => {
  let component: AppelCustomerComponent;
  let fixture: ComponentFixture<AppelCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppelCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppelCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
