import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsmsmodalComponent } from './modelsmsmodal.component';

describe('ModelsmsmodalComponent', () => {
  let component: ModelsmsmodalComponent;
  let fixture: ComponentFixture<ModelsmsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelsmsmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelsmsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
