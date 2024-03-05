import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupeCritereComponent } from './create-groupe-critere.component';

describe('CreateGroupeCritereComponent', () => {
  let component: CreateGroupeCritereComponent;
  let fixture: ComponentFixture<CreateGroupeCritereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupeCritereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGroupeCritereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
