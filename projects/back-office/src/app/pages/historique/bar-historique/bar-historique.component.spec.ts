import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarHistoriqueComponent } from './bar-historique.component';

describe('BarHistoriqueComponent', () => {
  let component: BarHistoriqueComponent;
  let fixture: ComponentFixture<BarHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarHistoriqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
