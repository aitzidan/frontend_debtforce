import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCreancesComponent } from './liste-creances.component';

describe('ListeCreancesComponent', () => {
  let component: ListeCreancesComponent;
  let fixture: ComponentFixture<ListeCreancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCreancesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCreancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
