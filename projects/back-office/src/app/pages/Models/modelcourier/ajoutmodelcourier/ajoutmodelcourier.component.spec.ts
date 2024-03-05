import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutmodelcourierComponent } from './ajoutmodelcourier.component';

describe('AjoutmodelcourierComponent', () => {
  let component: AjoutmodelcourierComponent;
  let fixture: ComponentFixture<AjoutmodelcourierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutmodelcourierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutmodelcourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
