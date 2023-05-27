import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetPreviewComponent } from './predmet-preview.component';

describe('PredmetPreviewComponent', () => {
  let component: PredmetPreviewComponent;
  let fixture: ComponentFixture<PredmetPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PredmetPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
