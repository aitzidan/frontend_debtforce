import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDebiteurComponent } from './bar-debiteur.component';

describe('BarDebiteurComponent', () => {
  let component: BarDebiteurComponent;
  let fixture: ComponentFixture<BarDebiteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarDebiteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarDebiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
