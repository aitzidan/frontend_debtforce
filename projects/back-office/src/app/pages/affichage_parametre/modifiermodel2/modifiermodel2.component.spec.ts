import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modifiermodel2Component } from './modifiermodel2.component';

describe('Modifiermodel2Component', () => {
  let component: Modifiermodel2Component;
  let fixture: ComponentFixture<Modifiermodel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Modifiermodel2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modifiermodel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
