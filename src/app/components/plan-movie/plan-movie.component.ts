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
  constructor(private fb: FormBuilder, private api: MovieApiService) {}

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

    let index: number = 0;
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
