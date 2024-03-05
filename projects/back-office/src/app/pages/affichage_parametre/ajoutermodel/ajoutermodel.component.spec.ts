import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutermodelComponent } from './ajoutermodel.component';

describe('AjoutermodelComponent', () => {
  let component: AjoutermodelComponent;
  let fixture: ComponentFixture<AjoutermodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutermodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutermodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
