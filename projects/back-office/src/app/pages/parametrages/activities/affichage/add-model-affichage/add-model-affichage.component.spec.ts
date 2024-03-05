import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModelAffichageComponent } from './add-model-affichage.component';

describe('AddModelAffichageComponent', () => {
  let component: AddModelAffichageComponent;
  let fixture: ComponentFixture<AddModelAffichageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModelAffichageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddModelAffichageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
