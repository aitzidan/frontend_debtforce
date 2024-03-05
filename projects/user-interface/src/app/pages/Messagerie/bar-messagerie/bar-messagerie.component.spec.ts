import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarMessagerieComponent } from './bar-messagerie.component';

describe('BarMessagerieComponent', () => {
  let component: BarMessagerieComponent;
  let fixture: ComponentFixture<BarMessagerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarMessagerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarMessagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
