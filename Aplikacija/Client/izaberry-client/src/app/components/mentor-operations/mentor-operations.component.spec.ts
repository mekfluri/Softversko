import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorOperationsComponent } from './mentor-operations.component';

describe('MentorOperationsComponent', () => {
  let component: MentorOperationsComponent;
  let fixture: ComponentFixture<MentorOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
