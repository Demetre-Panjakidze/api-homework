import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieApiService } from '../../movie-api.service';
import { movieInDetails, result } from '../../movie.model';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Output() movieID = new EventEmitter<any>();
  searchResult$: Observable<result> | undefined;
  searched: boolean = false;
  content: string = '';
  constructor(private api: MovieApiService) {}

  search() {
    this.searchResult$ = this.api.movieSearch(this.content);
    this.searchResult$.subscribe((info) => {
      if (info && info.Search && info.Search.length > 0) {
        info.Search.forEach((movie) => {
          this.movieID.emit(movie.imdbID);
        });
      }
    });
    this.searched = true;
    this.content = '';
  }
}
