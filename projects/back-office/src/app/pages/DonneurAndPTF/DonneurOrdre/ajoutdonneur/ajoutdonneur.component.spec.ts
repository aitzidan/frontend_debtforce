import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutdonneurComponent } from './ajoutdonneur.component';

describe('AjoutdonneurComponent', () => {
  let component: AjoutdonneurComponent;
  let fixture: ComponentFixture<AjoutdonneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutdonneurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutdonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
