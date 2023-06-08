import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KomentariUserComponent } from './komentari-user.component';

describe('KomentariUserComponent', () => {
  let component: KomentariUserComponent;
  let fixture: ComponentFixture<KomentariUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KomentariUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KomentariUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
