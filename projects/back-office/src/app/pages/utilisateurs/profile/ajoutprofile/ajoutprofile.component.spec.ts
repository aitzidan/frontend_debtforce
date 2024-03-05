import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutprofileComponent } from './ajoutprofile.component';

describe('AjoutprofileComponent', () => {
  let component: AjoutprofileComponent;
  let fixture: ComponentFixture<AjoutprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutprofileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
