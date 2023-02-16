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
  countrySearchResult$: Observable<any> | undefined;
  seperateObj: any[] = [];
  voteClicked: boolean = false;

  constructor(private api: MovieApiService) {}

  public getFlags(country: string) {
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

    this.countrySearchResult$ = this.searchResult$.pipe(
      switchMap((movie) => {
        const countries = movie.Country?.split(', ')?.map((country) =>
          this.getFlags(country)
        );
        const obj = forkJoin([...(countries ?? [])]);
        return obj;
      })
    );

    this.searchResult$
      .pipe(map((x) => x?.Genre?.split(', ')))
      .subscribe((genres) => {
        this.genreList = genres;
      });

    this.countrySearchResult$.subscribe((x: any) => {
      this.seperateObj = x;
    });
  }

  rating() {
    this.voteClicked = true;
  }
}
