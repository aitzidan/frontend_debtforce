import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiermodelComponent } from './modifiermodel.component';

describe('ModifiermodelComponent', () => {
  let component: ModifiermodelComponent;
  let fixture: ComponentFixture<ModifiermodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiermodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiermodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
