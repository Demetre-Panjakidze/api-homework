import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs';
import { MovieApiService } from 'src/app/movie-api.service';
import { RegisterMovie, MovieType } from 'src/app/movie.model';
import { dateValidator, TakenName } from 'src/app/app.validator';

@Component({
  selector: 'app-plan-movie',
  templateUrl: './plan-movie.component.html',
  styleUrls: ['./plan-movie.component.scss'],
})
export class PlanMovieComponent implements OnInit {
  form: FormGroup<RegisterMovie> = this.buildForm();
  countryList = this.form.controls.movieCountries;
  premiereList = this.form.controls.moviePremierePlace;
  movieType = MovieType;
  isSubmitted: boolean = false;
  errorMessage: boolean = false;

  constructor(private fb: FormBuilder, private api: MovieApiService) {}

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.status !== 'INVALID') {
      this.errorMessage = false;
      this.api
        .saveMyMovie({
          movieName: this.form.value.movieName || null,
          movieType: this.form.value.movieType || null,
          seriesEpisodesNum: this.form.value.seriesEpisodesNum || null,
          movieRuntime: this.form.value.movieRuntime || null,
          movieReleaseDate: this.form.value.movieReleaseDate || null,
          movieCountries: this.form.value.movieCountries || [],
          moviePremierePlace: this.form.value.moviePremierePlace || [],
          movieRating: this.form.value.movieRating || null,
          movieGenre: this.form.value.movieGenre || null,
        })
        .subscribe();
      console.log(this.form);
    } else {
      this.errorMessage = true;
    }
  }

  get CountriesLength() {
    return this.form.controls.movieCountries?.controls.length;
  }

  get PremieresLength() {
    return this.form.controls.moviePremierePlace?.controls.length;
  }

  private buildForm() {
    return this.fb.group<RegisterMovie>({
      movieName: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
        asyncValidators: [TakenName(this.api)],
        updateOn: 'blur',
      }),
      movieType: this.fb.control('Movie'),
      movieReleaseDate: this.fb.control('', {
        validators: [Validators.required, dateValidator()],
        updateOn: 'blur',
      }),
      movieGenre: this.fb.control([]),
      movieCountries: this.fb.array([this.fb.control('')]),
      moviePremierePlace: this.fb.array([this.fb.control('')]),
      movieRating: this.fb.control(0, {
        validators: [Validators.min(1)],
      }),
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

  disabledFn() {
    return true;
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
  }
}
