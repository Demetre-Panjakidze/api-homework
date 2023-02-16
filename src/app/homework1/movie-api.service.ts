import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homework1Module } from './homework1.module';
import { movieInDetails, result } from './movie.model';

const API_BASE = 'https://www.omdbapi.com/?apikey=c10494d2';
const COUNTY_BASE = 'https://restcountries.com';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  constructor(private http: HttpClient) {}
  selectedMovieId: string = '';

  movieSearch(content: string): Observable<result> {
    return this.http.get<result>(`${API_BASE}&s=${content}`);
  }

  getMovieDetails(movieID: string): Observable<movieInDetails> {
    return this.http.get<movieInDetails>(`${API_BASE}&i=${movieID}`);
  }

  getCountyDetails(countryName: string) {
    return this.http.get(
      `${COUNTY_BASE}/v3.1/name/${countryName}?fullText=true`
    );
  }
}
