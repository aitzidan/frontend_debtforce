import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampModalAddComponent } from './champ-modal-add.component';

describe('ChampModalAddComponent', () => {
  let component: ChampModalAddComponent;
  let fixture: ComponentFixture<ChampModalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampModalAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
