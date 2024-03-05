import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvellefactureComponent } from './nouvellefacture.component';

describe('NouvellefactureComponent', () => {
  let component: NouvellefactureComponent;
  let fixture: ComponentFixture<NouvellefactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NouvellefactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouvellefactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
