import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueEmployeurComponent } from './historique-employeur.component';

describe('HistoriqueEmployeurComponent', () => {
  let component: HistoriqueEmployeurComponent;
  let fixture: ComponentFixture<HistoriqueEmployeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueEmployeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
