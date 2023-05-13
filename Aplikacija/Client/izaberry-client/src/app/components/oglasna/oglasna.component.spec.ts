import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasnaComponent } from './oglasna.component';

describe('OglasnaComponent', () => {
  let component: OglasnaComponent;
  let fixture: ComponentFixture<OglasnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OglasnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OglasnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
