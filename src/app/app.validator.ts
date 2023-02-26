import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, tap } from 'rxjs';
import { MovieApiService } from './movie-api.service';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();
    if (selectedDate < today) {
      return { pastDateSelected: true };
    }
    return null;
  };
}

export class TakenNamesValidator {
  constructor(private api: MovieApiService) {}

  validate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return this.api.myMovieNames.includes(control.value)
        ? { takenName: true }
        : null;
    };
  }
}

export class AtLeastOneGenre {
  constructor(private api: MovieApiService) {}
  fn$ = this.api.getMyMovie();
  genreList: string[] | null = [];
  validate(): ValidatorFn {
    this.fn$
      .pipe(
        map((x) => {
          this.genreList = x[x.length - 1]?.movieGenre;
        })
      )
      .subscribe();
    return (control: AbstractControl): ValidationErrors | null => {
      return !this.genreList?.length ? { genresEmpty: true } : null;
    };
  }
}
