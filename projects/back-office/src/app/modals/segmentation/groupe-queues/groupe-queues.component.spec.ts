import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeQueuesComponent } from './groupe-queues.component';

describe('GroupeQueuesComponent', () => {
  let component: GroupeQueuesComponent;
  let fixture: ComponentFixture<GroupeQueuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupeQueuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupeQueuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
