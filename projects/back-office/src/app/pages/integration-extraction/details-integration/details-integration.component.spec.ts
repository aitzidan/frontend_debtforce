import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsIntegrationComponent } from './details-integration.component';

describe('DetailsIntegrationComponent', () => {
  let component: DetailsIntegrationComponent;
  let fixture: ComponentFixture<DetailsIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsIntegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
