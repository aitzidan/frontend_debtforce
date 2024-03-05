import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierptfComponent } from './modifierptf.component';

describe('ModifierptfComponent', () => {
  let component: ModifierptfComponent;
  let fixture: ComponentFixture<ModifierptfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierptfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierptfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
