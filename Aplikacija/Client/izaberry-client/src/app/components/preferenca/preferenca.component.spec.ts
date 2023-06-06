import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencaComponent } from './preferenca.component';

describe('PreferencaComponent', () => {
  let component: PreferencaComponent;
  let fixture: ComponentFixture<PreferencaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreferencaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreferencaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
