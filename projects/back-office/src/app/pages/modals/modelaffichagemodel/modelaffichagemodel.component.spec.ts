import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelaffichagemodelComponent } from './modelaffichagemodel.component';

describe('ModelaffichagemodelComponent', () => {
  let component: ModelaffichagemodelComponent;
  let fixture: ComponentFixture<ModelaffichagemodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelaffichagemodelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelaffichagemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
