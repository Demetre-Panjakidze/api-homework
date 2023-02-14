import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homework1Module } from './homework1.module';
import { movieInDetails, result, movieInOverall } from './movie.model';

const API_BASE = 'https://www.omdbapi.com/?apikey=c10494d2';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  constructor(private http: HttpClient) {}

  movieSearch(content: string): Observable<result> {
    return this.http.get<result>(`${API_BASE}&s=${content}`);
  }

  getMovieDetails(movieID: string): Observable<movieInDetails> {
    return this.http.get<movieInDetails>(`${API_BASE}i=tt${movieID}`);
  }
}
