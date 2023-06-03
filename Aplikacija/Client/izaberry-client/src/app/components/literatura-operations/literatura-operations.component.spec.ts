import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraturaOperationsComponent } from './literatura-operations.component';

describe('LiteraturaOperationsComponent', () => {
  let component: LiteraturaOperationsComponent;
  let fixture: ComponentFixture<LiteraturaOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiteraturaOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiteraturaOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
