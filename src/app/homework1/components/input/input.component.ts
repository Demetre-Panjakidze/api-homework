import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieApiService } from '../../movie-api.service';
import { movieInDetails, movieInOverall, result } from '../../movie.model';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  searchResult$: Observable<result> | undefined;
  searched: boolean = false;
  content: string = '';
  movieID: string = '';

  constructor(private api: MovieApiService) {}

  search() {
    this.searchResult$ = this.api.movieSearch(this.content);
    this.searched = true;
    this.content = '';
  }

  chosenMovie(movie: movieInOverall) {
    this.api.selectedMovieId = movie.imdbID;
  }
}
