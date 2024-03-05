import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebiteurContactsComponent } from './debiteur-contacts.component';

describe('DebiteurContactsComponent', () => {
  let component: DebiteurContactsComponent;
  let fixture: ComponentFixture<DebiteurContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebiteurContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebiteurContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
