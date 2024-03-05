import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierprofileComponent } from './modifierprofile.component';

describe('ModifierprofileComponent', () => {
  let component: ModifierprofileComponent;
  let fixture: ComponentFixture<ModifierprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
