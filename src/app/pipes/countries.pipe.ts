import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { MovieApiService } from '../movie-api.service';
import { CountryList } from '../movie.model';

@Pipe({ name: 'countries' })
export class CountriesPipe implements PipeTransform {
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

  transform(
    arr: any,
    used: (string | null)[] | undefined,
    self: string | null
  ): string[] {
    return this.countryNames.filter((x) => {
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
    return this.premiereNames.filter((x) => {
      if (!used?.includes(x) || x === self) {
        return true;
      }
      return false;
    });
  }
}
