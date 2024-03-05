import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampsmodalUpdateComponent } from './champsmodal-update.component';

describe('ChampsmodalUpdateComponent', () => {
  let component: ChampsmodalUpdateComponent;
  let fixture: ComponentFixture<ChampsmodalUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampsmodalUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampsmodalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
