import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ajoutermodel2Component } from './ajoutermodel2.component';

describe('Ajoutermodel2Component', () => {
  let component: Ajoutermodel2Component;
  let fixture: ComponentFixture<Ajoutermodel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ajoutermodel2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ajoutermodel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
