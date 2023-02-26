import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieApiService } from '../../movie-api.service';

@Component({
  selector: 'app-rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.scss'],
})
export class RatedMoviesComponent {
  favoriteMoviesList$: Observable<any> = this.api.getMyList();
  editMode: boolean = false;
  selectedJokeId: string | undefined;
  // amountOfMovies: number = 1;
  @ViewChild('input') input: ElementRef | undefined;
  constructor(private api: MovieApiService) {}

  edit(id: string) {
    this.selectedJokeId = id;
  }

  delete(id: string) {
    this.api.deleteMovie(id).subscribe();
    this.favoriteMoviesList$ = this.api.getMyList();
  }

  cancel() {
    this.selectedJokeId = undefined;
  }

  save() {
    const value = this?.input?.nativeElement.value;
    this.api;
    this.selectedJokeId = undefined;
  }
}
