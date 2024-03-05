import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneurordreComponent } from './donneurordre.component';

describe('DonneurordreComponent', () => {
  let component: DonneurordreComponent;
  let fixture: ComponentFixture<DonneurordreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonneurordreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonneurordreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
