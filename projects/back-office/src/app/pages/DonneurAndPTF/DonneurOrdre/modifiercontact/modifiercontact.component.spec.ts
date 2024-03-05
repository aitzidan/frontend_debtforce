import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiercontactComponent } from './modifiercontact.component';

describe('ModifiercontactComponent', () => {
  let component: ModifiercontactComponent;
  let fixture: ComponentFixture<ModifiercontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiercontactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiercontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
