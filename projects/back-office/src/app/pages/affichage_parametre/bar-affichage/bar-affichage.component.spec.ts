import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarAffichageComponent } from './bar-affichage.component';

describe('BarAffichageComponent', () => {
  let component: BarAffichageComponent;
  let fixture: ComponentFixture<BarAffichageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarAffichageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
