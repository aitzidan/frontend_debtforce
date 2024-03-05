import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeModeleFacturationComponent } from './liste-modele-facturation.component';

describe('ListeModeleFacturationComponent', () => {
  let component: ListeModeleFacturationComponent;
  let fixture: ComponentFixture<ListeModeleFacturationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeModeleFacturationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeModeleFacturationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
