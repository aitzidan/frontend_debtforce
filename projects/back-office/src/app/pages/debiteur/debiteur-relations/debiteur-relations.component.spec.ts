import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebiteurRelationsComponent } from './debiteur-relations.component';

describe('DebiteurRelationsComponent', () => {
  let component: DebiteurRelationsComponent;
  let fixture: ComponentFixture<DebiteurRelationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebiteurRelationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebiteurRelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
