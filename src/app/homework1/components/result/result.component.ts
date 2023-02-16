import { Component } from '@angular/core';
import { forkJoin, Observable, of, switchMap, map } from 'rxjs';
import { MovieApiService } from '../../movie-api.service';
import { CountryDetails, movieInDetails } from '../../movie.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  searchResult$: Observable<movieInDetails> | undefined;
  countrySearchResult$: Observable<CountryDetails> | undefined;
  genreList: string[] = [];
  countryList: string[] = [];

  constructor(private api: MovieApiService) {}
  private fetchFlagsAndCurrencies(country: string) {
    return this.api.getCountyDetails(country).pipe(
      map((x: any) => {
        return {
          country: country,
          flags: x[0].flags,
          currencies: x[0].currencies,
        };
      })
    );
  }

  ngOnInit() {
    this.searchResult$ = this.api.getMovieDetails(this.api.selectedMovieId);
    this.api
      .getMovieDetails(this.api.selectedMovieId)
      .pipe(
        switchMap((movie) => {
          const countries = movie.Country?.split(', ').map((country) =>
            this.fetchFlagsAndCurrencies(country)
          );
          const obj = forkJoin([...countries]);
          return obj;
        })
      )
      .subscribe(console.log);
    this.searchResult$.subscribe((x) => {
      const genres = x.Genre.split(', ');
      genres.forEach((genre) => {
        this.genreList.push(genre);
      });
    });
  }
}
