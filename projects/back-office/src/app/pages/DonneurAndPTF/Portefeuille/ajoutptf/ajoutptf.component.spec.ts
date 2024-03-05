import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutptfComponent } from './ajoutptf.component';

describe('AjoutptfComponent', () => {
  let component: AjoutptfComponent;
  let fixture: ComponentFixture<AjoutptfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutptfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutptfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
