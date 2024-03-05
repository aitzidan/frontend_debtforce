import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCritereComponent } from './view-critere.component';

describe('ViewCritereComponent', () => {
  let component: ViewCritereComponent;
  let fixture: ComponentFixture<ViewCritereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCritereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCritereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
