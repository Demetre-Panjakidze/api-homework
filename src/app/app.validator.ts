import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
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
