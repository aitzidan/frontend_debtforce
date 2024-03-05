import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModelFacturationComponent } from './update-model-facturation.component';

describe('UpdateModelFacturationComponent', () => {
  let component: UpdateModelFacturationComponent;
  let fixture: ComponentFixture<UpdateModelFacturationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateModelFacturationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateModelFacturationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
