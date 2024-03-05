import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarCreanceComponent } from './bar-creance.component';

describe('BarCreanceComponent', () => {
  let component: BarCreanceComponent;
  let fixture: ComponentFixture<BarCreanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarCreanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
