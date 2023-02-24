import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { MovieApiService } from 'src/app/movie-api.service';
import {
  CountryList,
  RegisterMovie,
  MovieType,
  Genre,
  AddMyMovie,
} from 'src/app/movie.model';
import { dateValidator, TakenNamesValidator } from 'src/app/app.validator';

@Component({
  selector: 'app-plan-movie',
  templateUrl: './plan-movie.component.html',
  styleUrls: ['./plan-movie.component.scss'],
})
export class PlanMovieComponent implements OnInit {
  form: FormGroup<RegisterMovie> = this.buildForm();
  countriesResult$: Observable<CountryList[]> | undefined =
    this.api.getCountryList();
  countryList = this.form.controls.movieCountries;
  premiereList = this.form.controls.moviePremierePlace;
  countryNames: string[] = [];
  premiereNames: string[] = [];
  takenMovieNames: string[] = [];
  movieType = MovieType;
  genreList = Object.values(Genre);
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private api: MovieApiService) {}

  onSubmit() {
    this.isSubmitted = true;
    this.api
      .saveMyMovie({
        movieName: this.form.value.movieName || null,
        movieType: this.form.value.movieType || null,
        seriesEpisodesNum: this.form.value.seriesEpisodesNum || null,
        movieRuntime: this.form.value.movieRuntime || null,
        movieReleaseDate: this.form.value.movieReleaseDate || null,
        movieCountries: this.form.value.movieCountries || [],
        moviePremierePlace: this.form.value.moviePremierePlace || [],
      })
      .subscribe();
    this.api
      .getMyMovie()
      .pipe(
        map((movies) =>
          movies.map((movie) => {
            this.api.myMovieNames.push(movie.movieName);
          })
        )
      )
      .subscribe();
    console.log(this.form);
  }

  get CountriesLength() {
    return this.form.controls.movieCountries?.controls.length;
  }

  get PremieresLength() {
    return this.form.controls.moviePremierePlace?.controls.length;
  }

  get PremiereCountriesLength() {
    return this.form.controls.moviePremierePlace?.controls.length;
  }

  private buildForm() {
    return this.fb.group<RegisterMovie>({
      movieName: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          new TakenNamesValidator(this.api).validate(),
        ],
        updateOn: 'blur',
      }),
      movieType: this.fb.control('Movie'),
      movieReleaseDate: this.fb.control('', {
        validators: [Validators.required, dateValidator()],
        updateOn: 'blur',
      }),
      movieGenre: this.fb.array([this.fb.control('')]),
      movieCountries: this.fb.array([this.fb.control('')]),
      moviePremierePlace: this.fb.array([this.fb.control('')]),
    });
  }

  private handleMovietype(x: any) {
    switch (x) {
      case 'Movie': {
        this.form.addControl(
          'movieRuntime',
          this.fb.control('', [
            Validators.required,
            Validators.min(60),
            Validators.max(180),
          ])
        );
        this.form.removeControl('seriesEpisodesNum');
        break;
      }
      case 'Series': {
        this.form.addControl(
          'seriesEpisodesNum',
          this.fb.control('', [Validators.required])
        );
        this.form.removeControl('movieRuntime');
        break;
      }
    }
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

  addPremiere() {
    if (this.PremieresLength === 10) {
      return;
    }
    this.premiereList.push(new FormControl(''));
  }

  removePremiere(index: number) {
    if (this.PremieresLength === 1) {
      return;
    }
    this.premiereList?.removeAt(index);
  }

  ngOnInit() {
    this.handleMovietype(this.form.controls['movieType'].value);
    this.form.controls['movieType'].valueChanges.subscribe((x) => {
      this.handleMovietype(x);
    });
    this.countriesResult$
      ?.pipe(
        mergeMap((country) => country),
        map((x: any) => {
          this.countryNames.push(x.name.common);
          this.premiereNames.push(x.name.common);
          return x;
        })
      )
      .subscribe((x) => x);
  }
}
