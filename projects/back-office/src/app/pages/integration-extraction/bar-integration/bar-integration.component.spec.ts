import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarIntegrationComponent } from './bar-integration.component';

describe('BarIntegrationComponent', () => {
  let component: BarIntegrationComponent;
  let fixture: ComponentFixture<BarIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarIntegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
