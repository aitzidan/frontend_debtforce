import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampsmodalComponent } from './champsmodal.component';

describe('ChampsmodalComponent', () => {
  let component: ChampsmodalComponent;
  let fixture: ComponentFixture<ChampsmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampsmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampsmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
