import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateImportPaiementComponent } from './create-import-paiement.component';

describe('CreateImportPaiementComponent', () => {
  let component: CreateImportPaiementComponent;
  let fixture: ComponentFixture<CreateImportPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateImportPaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateImportPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
