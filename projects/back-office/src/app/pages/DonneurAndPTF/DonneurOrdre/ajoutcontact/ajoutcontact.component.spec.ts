import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutcontactComponent } from './ajoutcontact.component';

describe('AjoutcontactComponent', () => {
  let component: AjoutcontactComponent;
  let fixture: ComponentFixture<AjoutcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutcontactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
