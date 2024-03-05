import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchemaComponent } from './add-schema.component';

describe('AddSchemaComponent', () => {
  let component: AddSchemaComponent;
  let fixture: ComponentFixture<AddSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
