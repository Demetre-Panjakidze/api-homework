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
  countryCodesList: string[] = [];

  constructor(private api: MovieApiService) {}
  private fetchFlagsAndCurrencies(country: string) {
    return this.api.getCountyDetails(country).pipe(
      map((x: any) =>
        x.map((x: any) => {
          return { flags: x.flags, currencies: x.currencies };
        })
      )
    );
  }

  ngOnInit() {
    this.searchResult$ = this.api.getMovieDetails(this.api.selectedMovieId);
    this.api
      .getMovieDetails(this.api.selectedMovieId)
      .pipe(
        switchMap((movie) => {
          const title = movie.Title;
          const countries = movie.Country?.split(', ').map((country) =>
            this.fetchFlagsAndCurrencies(country)
          );
          return forkJoin([of({ title }), ...countries]);
        })
      )
      .subscribe(console.log);
    // this.searchResult$.subscribe((x) => {
    // const genres = x.Genre.split(', ');
    // const countries = x.Country.split(', ');
    // genres.forEach((genre) => {
    //   this.genreList.push(genre);
    // });
    // countries.forEach((country) => {
    //   this.api.getCountyDetails(country).subscribe((x) => {
    //     console.log();
    //     console.log(typeof x);
    //   });
    // });
    // });
  }
}
