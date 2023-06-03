import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajLiteraturuComponent } from './dodaj-literaturu.component';

describe('DodajLiteraturuComponent', () => {
  let component: DodajLiteraturuComponent;
  let fixture: ComponentFixture<DodajLiteraturuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajLiteraturuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajLiteraturuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
