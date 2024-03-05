import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatistiquesComponent } from './view-statistiques.component';

describe('ViewStatistiquesComponent', () => {
  let component: ViewStatistiquesComponent;
  let fixture: ComponentFixture<ViewStatistiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStatistiquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStatistiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
