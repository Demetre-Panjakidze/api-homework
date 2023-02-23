import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanMovieComponent } from './plan-movie.component';

describe('PlanMovieComponent', () => {
  let component: PlanMovieComponent;
  let fixture: ComponentFixture<PlanMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
