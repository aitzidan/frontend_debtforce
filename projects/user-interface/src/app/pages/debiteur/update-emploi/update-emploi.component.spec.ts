import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmploiComponent } from './update-emploi.component';

describe('UpdateEmploiComponent', () => {
  let component: UpdateEmploiComponent;
  let fixture: ComponentFixture<UpdateEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateEmploiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
