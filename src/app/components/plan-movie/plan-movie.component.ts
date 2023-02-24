import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, mergeMap, Observable } from 'rxjs';
import { MovieApiService } from 'src/app/movie-api.service';
import {
  CountryList,
  RegisterMovie,
  MovieType,
  Genre,
} from 'src/app/movie.model';

@Component({
  selector: 'app-plan-movie',
  templateUrl: './plan-movie.component.html',
  styleUrls: ['./plan-movie.component.scss'],
})
export class PlanMovieComponent implements OnInit {
  form: FormGroup<RegisterMovie> = this.buildForm();
  countriesResult$: Observable<any> | undefined = this.api.getCountryList();
  countryNames: any[] = [];
  isSubmitted: boolean = false;
  movieType = MovieType;
  genreList = Object.values(Genre);
  genreValues: Array<any> = [];
  countryList = this.form.controls.movieCountries;

  constructor(private fb: FormBuilder, private api: MovieApiService) {}

  get CountriesLength() {
    return this.form.controls.movieCountries?.controls.length;
  }

  private buildForm() {
    return this.fb.group<RegisterMovie>({
      movieName: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      movieType: this.fb.control(this.movieType?.Movie),
      movieReleaseDate: this.fb.control('', [Validators.required]),
      movieGenre: this.fb.array([this.fb.control('')]),
      movieCountries: this.fb.array([this.fb.control('')]),
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

  addCountry() {
    if (this.CountriesLength === 5) {
      return;
    }
    this.countryList?.push(new FormControl(''));
  }

  removeCountry(index: number) {
    if (this.CountriesLength === 1) {
      return;
    }
    this.countryList?.removeAt(index);
  }

  ngOnInit() {
    this.form.controls['movieType'].valueChanges.subscribe((x) => {
      this.handleMovietype(x);
    });

    this.countriesResult$
      ?.pipe(
        mergeMap((country) => country),
        map((x) => {
          this.countryNames.push(x);
          return x;
        })
      )
      .subscribe((x) => x);
  }
}
