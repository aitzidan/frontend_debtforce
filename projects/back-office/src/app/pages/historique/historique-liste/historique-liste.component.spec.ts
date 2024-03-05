import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueListeComponent } from './historique-liste.component';

describe('HistoriqueListeComponent', () => {
  let component: HistoriqueListeComponent;
  let fixture: ComponentFixture<HistoriqueListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
