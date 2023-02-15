import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieApiService } from '../../movie-api.service';
import { movieInDetails } from '../../movie.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent {
  searchResult$: Observable<movieInDetails> | undefined;
  constructor(private api: MovieApiService) {}
  genreList: string[] = [];
  creatorsList: string[] = [];
  ngOnInit() {
    this.searchResult$ = this.api.getMovieDetails(this.api.selectedMovieId);
    this.searchResult$.subscribe((x) => {
      const genres = x.Genre.split(', ');
      genres.forEach((genre) => {
        this.genreList.push(genre);
      });
    });
  }
}
