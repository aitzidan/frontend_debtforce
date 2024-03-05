import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarSchemaComponent } from './bar-schema.component';

describe('BarSchemaComponent', () => {
  let component: BarSchemaComponent;
  let fixture: ComponentFixture<BarSchemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarSchemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
