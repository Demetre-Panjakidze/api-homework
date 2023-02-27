import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
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

export function takenName(service: MovieApiService): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return service.getMyMovie().pipe(
      map((movie) => {
        return movie.find(
          (x) => x.movieName?.toLowerCase() == control.value.toLowerCase()
        )
          ? { usedName: true }
          : null;
      })
    );
  };
}
