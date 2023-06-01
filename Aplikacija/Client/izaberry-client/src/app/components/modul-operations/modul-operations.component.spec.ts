import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulOperationsComponent } from './modul-operations.component';

describe('ModulOperationsComponent', () => {
  let component: ModulOperationsComponent;
  let fixture: ComponentFixture<ModulOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModulOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
