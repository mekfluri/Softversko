import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KomentariComponent } from './komentari.component';

describe('KomentariComponent', () => {
  let component: KomentariComponent;
  let fixture: ComponentFixture<KomentariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KomentariComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KomentariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
