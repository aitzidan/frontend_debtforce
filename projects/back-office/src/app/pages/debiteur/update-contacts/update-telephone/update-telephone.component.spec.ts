import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTelephoneComponent } from './update-telephone.component';

describe('UpdateTelephoneComponent', () => {
  let component: UpdateTelephoneComponent;
  let fixture: ComponentFixture<UpdateTelephoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTelephoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTelephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
