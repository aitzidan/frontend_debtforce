import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueEmploiComponent } from './historique-emploi.component';

describe('HistoriqueEmploiComponent', () => {
  let component: HistoriqueEmploiComponent;
  let fixture: ComponentFixture<HistoriqueEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueEmploiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
