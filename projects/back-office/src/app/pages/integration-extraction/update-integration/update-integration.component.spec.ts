import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIntegrationComponent } from './update-integration.component';

describe('UpdateIntegrationComponent', () => {
  let component: UpdateIntegrationComponent;
  let fixture: ComponentFixture<UpdateIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIntegrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
