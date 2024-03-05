import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarEncaissementComponent } from './bar-encaissement.component';

describe('BarEncaissementComponent', () => {
  let component: BarEncaissementComponent;
  let fixture: ComponentFixture<BarEncaissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarEncaissementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarEncaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
