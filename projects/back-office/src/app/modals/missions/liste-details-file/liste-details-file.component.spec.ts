import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDetailsFileComponent } from './liste-details-file.component';

describe('ListeDetailsFileComponent', () => {
  let component: ListeDetailsFileComponent;
  let fixture: ComponentFixture<ListeDetailsFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDetailsFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDetailsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
