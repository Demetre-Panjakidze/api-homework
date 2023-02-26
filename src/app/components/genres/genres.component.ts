import { Component } from '@angular/core';
import { Genre } from 'src/app/movie.model';
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent {
  genreList = Object.values(Genre);
}
