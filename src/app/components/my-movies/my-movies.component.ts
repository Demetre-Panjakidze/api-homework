import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieApiService } from 'src/app/movie-api.service';
import { AddMyMovie } from 'src/app/movie.model';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.scss'],
})
export class MyMoviesComponent implements OnInit {
  myMoviesList$: Observable<AddMyMovie[]> = this.api.getMyMovie();
  constructor(private api: MovieApiService) {}
  ngOnInit() {
    this.myMoviesList$.subscribe(console.log);
  }
  minToHour(x: any): string {
    return Math.round(x / 60) + 'h';
  }
}
