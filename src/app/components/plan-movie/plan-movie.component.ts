import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { MovieApiService } from 'src/app/movie-api.service';
import { CountryList, RegisterMovie, MovieType } from 'src/app/movie.model';

@Component({
  selector: 'app-plan-movie',
  templateUrl: './plan-movie.component.html',
  styleUrls: ['./plan-movie.component.scss'],
})
export class PlanMovieComponent implements OnInit {
  form: FormGroup<RegisterMovie> = this.buildForm();
  countriesResult$: Observable<CountryList> | undefined =
    this.api.getCountryList();
  countryNameArr: any;
  isSubmitted: boolean = false;
  movieType = MovieType;

  constructor(private fb: FormBuilder, private api: MovieApiService) {}

  private buildForm() {
    return new FormGroup<RegisterMovie>({
      movieName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      movieType: this.fb.control(this.movieType?.Movie),
    });
  }

  private handleMovietype(x: any) {
    switch (x) {
      case 'Movie': {
        this.form.addControl(
          'movieRuntime',
          this.fb.control('', [Validators.min(60), Validators.max(180)])
        );
        this.form.removeControl('seriesEpisodesNum');
        break;
      }
      case 'Series': {
        this.form.addControl('seriesEpisodesNum', this.fb.control(''));
        this.form.removeControl('movieRuntime');
        break;
      }
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    console.log(this.form);
  }

  ngOnInit() {
    this.form.controls['movieType'].valueChanges.subscribe((x) => {
      this.handleMovietype(x);
    });

    this.countriesResult$
      ?.pipe(map((country) => country))
      .subscribe(console.log);
  }
}
