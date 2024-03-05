import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueAddresseComponent } from './historique-addresse.component';

describe('HistoriqueAddresseComponent', () => {
  let component: HistoriqueAddresseComponent;
  let fixture: ComponentFixture<HistoriqueAddresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueAddresseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueAddresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
