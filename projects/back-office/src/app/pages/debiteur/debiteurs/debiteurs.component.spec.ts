import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebiteursComponent } from './debiteurs.component';

describe('DebiteursComponent', () => {
  let component: DebiteursComponent;
  let fixture: ComponentFixture<DebiteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebiteursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebiteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
