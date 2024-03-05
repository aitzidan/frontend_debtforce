import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiermodelcourierComponent } from './modifiermodelcourier.component';

describe('ModifiermodelcourierComponent', () => {
  let component: ModifiermodelcourierComponent;
  let fixture: ComponentFixture<ModifiermodelcourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiermodelcourierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiermodelcourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
