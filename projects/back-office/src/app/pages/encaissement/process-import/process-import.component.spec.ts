import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessImportComponent } from './process-import.component';

describe('ProcessImportComponent', () => {
  let component: ProcessImportComponent;
  let fixture: ComponentFixture<ProcessImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
