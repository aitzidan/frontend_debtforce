import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiergroupeComponent } from './modifiergroupe.component';

describe('ModifiergroupeComponent', () => {
  let component: ModifiergroupeComponent;
  let fixture: ComponentFixture<ModifiergroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiergroupeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiergroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
