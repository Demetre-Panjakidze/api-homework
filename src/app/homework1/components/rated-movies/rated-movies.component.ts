import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieApiService } from '../../movie-api.service';

@Component({
  selector: 'app-rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.scss'],
})
export class RatedMoviesComponent implements OnInit {
  favoriteMoviesList$: Observable<any> = this.api.getMyList();

  constructor(private api: MovieApiService) {}

  ngOnInit() {}
}
