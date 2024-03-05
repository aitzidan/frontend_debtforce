import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCritereComponent } from './create-critere.component';

describe('CreateCritereComponent', () => {
  let component: CreateCritereComponent;
  let fixture: ComponentFixture<CreateCritereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCritereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCritereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
