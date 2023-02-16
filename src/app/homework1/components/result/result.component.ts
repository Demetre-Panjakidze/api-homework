import { Component } from '@angular/core';
import { forkJoin, Observable, of, switchMap, map } from 'rxjs';
import { MovieApiService } from '../../movie-api.service';
import { movieInDetails } from '../../movie.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  searchResult$: Observable<movieInDetails> | undefined;
  genreList: string[] = [];
  countrySearchResult$: any;
  seperateObj: any[] = [];

  constructor(private api: MovieApiService) {}
  public fetchFlags(country: string) {
    return this.api.getCountyDetails(country).pipe(
      map((x: any) => {
        return {
          country: country,
          flags: x[0].flags,
        };
      })
    );
  }

  ngOnInit() {
    this.searchResult$ = this.api.getMovieDetails(this.api.selectedMovieId);
    this.countrySearchResult$ = this.api
      .getMovieDetails(this.api.selectedMovieId)
      .pipe(
        switchMap((movie) => {
          const countries = movie.Country?.split(', ').map((country) =>
            this.fetchFlags(country)
          );
          const obj = forkJoin([...countries]);
          return obj;
        })
      );
    this.countrySearchResult$.subscribe((x: any) => {
      x.forEach((y: any) => {
        this.seperateObj.push(y);
      });
    });
    this.searchResult$.subscribe((x) => {
      const genres = x.Genre.split(', ');
      genres.forEach((genre) => {
        this.genreList.push(genre);
      });
    });
  }
}
