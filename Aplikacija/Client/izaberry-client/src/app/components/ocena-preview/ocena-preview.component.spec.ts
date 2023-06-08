import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcenaPreviewComponent } from './ocena-preview.component';

describe('OcenaPreviewComponent', () => {
  let component: OcenaPreviewComponent;
  let fixture: ComponentFixture<OcenaPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcenaPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcenaPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
