import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetOperationsComponent } from './predmet-operations.component';

describe('PredmetOperationsComponent', () => {
  let component: PredmetOperationsComponent;
  let fixture: ComponentFixture<PredmetOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredmetOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
