import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDebiteurComponent } from './details-debiteur.component';

describe('DetailsDebiteurComponent', () => {
  let component: DetailsDebiteurComponent;
  let fixture: ComponentFixture<DetailsDebiteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsDebiteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsDebiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
