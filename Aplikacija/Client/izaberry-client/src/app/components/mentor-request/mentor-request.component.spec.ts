import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorRequestComponent } from './mentor-request.component';

describe('MentorRequestComponent', () => {
  let component: MentorRequestComponent;
  let fixture: ComponentFixture<MentorRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
