import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateWindowComponent } from './rate-window.component';

describe('RateWindowComponent', () => {
  let component: RateWindowComponent;
  let fixture: ComponentFixture<RateWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
