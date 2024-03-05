import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarMissionsComponent } from './bar-missions.component';

describe('BarMissionsComponent', () => {
  let component: BarMissionsComponent;
  let fixture: ComponentFixture<BarMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarMissionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
