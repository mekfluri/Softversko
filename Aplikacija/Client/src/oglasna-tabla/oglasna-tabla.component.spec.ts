import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OglasnaTablaComponent } from './oglasna-tabla.component';

describe('OglasnaTablaComponent', () => {
  let component: OglasnaTablaComponent;
  let fixture: ComponentFixture<OglasnaTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OglasnaTablaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OglasnaTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
