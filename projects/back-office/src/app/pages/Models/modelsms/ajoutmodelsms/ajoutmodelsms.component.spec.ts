import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutmodelsmsComponent } from './ajoutmodelsms.component';

describe('AjoutmodelsmsComponent', () => {
  let component: AjoutmodelsmsComponent;
  let fixture: ComponentFixture<AjoutmodelsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutmodelsmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutmodelsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
