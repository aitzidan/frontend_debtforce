import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarQueueComponent } from './bar-queue.component';

describe('BarQueueComponent', () => {
  let component: BarQueueComponent;
  let fixture: ComponentFixture<BarQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
