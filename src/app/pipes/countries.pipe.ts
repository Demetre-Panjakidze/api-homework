import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { delay, map, Observable, tap } from 'rxjs';
import { MovieApiService } from '../movie-api.service';
import { CountryList } from '../movie.model';

@Pipe({ name: 'countries' })
export class CountriesPipe implements PipeTransform, OnInit {
  countriesResult$: Observable<CountryList[]> | undefined =
    this.api.getCountryList();
  countryNames: string[] = [];
  premiereNames: string[] = [];
  constructor(private api: MovieApiService) {
    this.countriesResult$
      ?.pipe(
        map((x) => {
          x.map((country) => {
            this.countryNames.push(country.name.common);
          });
        })
      )
      .subscribe();
  }

  ngOnInit() {}

  transform(
    arr: any,
    used: (string | null)[] | undefined,
    self: string | null
  ): string[] {
    const sortedCountryNames = this.countryNames.sort((a, b) =>
      a.localeCompare(b)
    );
    return sortedCountryNames.filter((x) => {
      if (!used?.includes(x) || x === self) {
        return true;
      }
      return false;
    });
  }
}

@Pipe({ name: 'premieres' })
export class PremieresPipe implements PipeTransform, OnInit {
  countriesResult$: Observable<CountryList[]> | undefined =
    this.api.getCountryList();
  premiereNames: string[] = [];
  constructor(private api: MovieApiService) {
    this.countriesResult$
      ?.pipe(
        map((x) =>
          x.map((country) => {
            this.premiereNames.push(country.name.common);
          })
        )
      )
      .subscribe((x) => x);
  }

  ngOnInit() {}
  transform(
    arr: any,
    used: (string | null)[] | undefined,
    self: string | null
  ): string[] {
    const sortedCountryNames = this.premiereNames.sort((a, b) =>
      a.localeCompare(b)
    );
    return sortedCountryNames.filter((x) => {
      if (!used?.includes(x) || x === self) {
        return true;
      }
      return false;
    });
  }
}

// class ApiService {
//   checkUsedEmail(email: string): Observable<boolean> {
//     return new Observable((observer) => {
//       setTimeout(() => {
//         if (alreadyUsedEmails.includes(email)) {
//           observer.next(true);
//         } else {
//           observer.next(false);
//         }
//         observer.complete();
//       }, 2000);
//     });
//   }
// }

// export function UsedMailValidator(): AsyncValidatorFn {
//   return (control: AbstractControl): Observable<ValidationErrors | null> => {
//     const apiService = new ApiService();
//     return apiService.checkUsedEmail(control.value).pipe(
//       map((isUsed) => {
//         return isUsed ? { isUsed } : null;
//       })
//     );
//   };
// }
