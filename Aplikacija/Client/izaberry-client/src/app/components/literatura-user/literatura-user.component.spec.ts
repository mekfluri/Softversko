import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiteraturaUserComponent } from './literatura-user.component';

describe('LiteraturaUserComponent', () => {
  let component: LiteraturaUserComponent;
  let fixture: ComponentFixture<LiteraturaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiteraturaUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiteraturaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
