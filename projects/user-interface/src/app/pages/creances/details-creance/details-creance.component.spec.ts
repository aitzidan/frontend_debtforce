import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCreanceComponent } from './details-creance.component';

describe('DetailsCreanceComponent', () => {
  let component: DetailsCreanceComponent;
  let fixture: ComponentFixture<DetailsCreanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCreanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
