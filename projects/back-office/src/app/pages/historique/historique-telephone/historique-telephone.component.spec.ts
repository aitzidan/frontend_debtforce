import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueTelephoneComponent } from './historique-telephone.component';

describe('HistoriqueTelephoneComponent', () => {
  let component: HistoriqueTelephoneComponent;
  let fixture: ComponentFixture<HistoriqueTelephoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriqueTelephoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueTelephoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
