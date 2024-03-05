import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiermodelsmsComponent } from './modifiermodelsms.component';

describe('ModifiermodelsmsComponent', () => {
  let component: ModifiermodelsmsComponent;
  let fixture: ComponentFixture<ModifiermodelsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiermodelsmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiermodelsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
