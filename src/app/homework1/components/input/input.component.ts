import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieApiService } from '../../movie-api.service';
import { movieInDetails, result } from '../../movie.model';
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  searchResult$: Observable<result> | undefined;
  searched: boolean = false;
  content: string = '';
  constructor(private api: MovieApiService) {}

  search() {
    this.searchResult$ = this.api.movieSearch(this.content);
    this.searched = true;
    this.content = '';
  }
}
