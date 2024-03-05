import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompetenceComponent } from './update-competence.component';

describe('UpdateCompetenceComponent', () => {
  let component: UpdateCompetenceComponent;
  let fixture: ComponentFixture<UpdateCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCompetenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
