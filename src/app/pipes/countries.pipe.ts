import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { map, mergeMap, Observable } from 'rxjs';
import { MovieApiService } from '../movie-api.service';

@Pipe({ name: 'countries' })
export class CountriesPipe implements PipeTransform, OnInit {
  countriesResult$: Observable<any> | undefined = this.api.getCountryList();
  countryNames: any[] = [];
  constructor(private api: MovieApiService) {}

  ngOnInit() {
    this.countriesResult$
      ?.pipe(
        mergeMap((country) => country),
        map((x: any) => {
          this.countryNames.push(x.name.common);
          return x;
        })
      )
      .subscribe((x) => x);
  }
  transform() {}
}
