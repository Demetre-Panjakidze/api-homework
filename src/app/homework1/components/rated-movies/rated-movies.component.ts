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
  editMode: boolean = false;
  // amountOfMovies: number = 1;
  constructor(private api: MovieApiService) {}

  ngOnInit() {
    // this.amountOfMovies = 1;
    // this.favoriteMoviesList$.subscribe((x) => {
    //   this.amountOfMovies++;
    // });
  }

  edit() {
    this.editMode = true;
  }

  delete(id: string) {
    this.api.deleteMovie(id).subscribe();
    this.favoriteMoviesList$ = this.api.getMyList();
  }
}
