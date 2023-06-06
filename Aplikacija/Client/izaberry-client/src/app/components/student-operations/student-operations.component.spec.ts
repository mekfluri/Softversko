import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOperationsComponent } from './student-operations.component';

describe('StudentOperationsComponent', () => {
  let component: StudentOperationsComponent;
  let fixture: ComponentFixture<StudentOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
