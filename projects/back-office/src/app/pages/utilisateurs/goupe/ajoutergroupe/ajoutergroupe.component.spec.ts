import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutergroupeComponent } from './ajoutergroupe.component';

describe('AjoutergroupeComponent', () => {
  let component: AjoutergroupeComponent;
  let fixture: ComponentFixture<AjoutergroupeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutergroupeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutergroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
