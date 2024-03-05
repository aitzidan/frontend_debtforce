import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierdonneurComponent } from './modifierdonneur.component';

describe('ModifierdonneurComponent', () => {
  let component: ModifierdonneurComponent;
  let fixture: ComponentFixture<ModifierdonneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierdonneurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierdonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
