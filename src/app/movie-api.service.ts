import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMyMovie, CountryList, movieInDetails, result } from './movie.model';

const API_BASE = 'https://www.omdbapi.com/?apikey=c10494d2';
const COUNTY_BASE = 'https://restcountries.com';
const MY_API_BASE = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class MovieApiService {
  selectedMovieId: string = '';
  myMovieNames: (string | null)[] = [];
  constructor(private http: HttpClient) {}

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

  getMyList() {
    return this.http.get(`${MY_API_BASE}/movies`);
  }

  saveMyList(movieDetails: movieInDetails) {
    return this.http.post(`${MY_API_BASE}/movies`, movieDetails);
  }

  deleteMovie(id: string) {
    return this.http.delete(`${MY_API_BASE}/movies/${id}`);
  }

  //bla will change below

  getMyMovie(): Observable<AddMyMovie[]> {
    return this.http.get<AddMyMovie[]>(`${MY_API_BASE}/myMovies`);
  }

  saveMyMovie(myMovie: AddMyMovie) {
    return this.http.post(`${MY_API_BASE}/myMovies`, myMovie);
  }

  deleteMyMovie(bla: any) {
    return this.http.delete(`${MY_API_BASE}/myMovies/${bla}`);
  }

  getCountryList(): Observable<any> {
    return this.http.get<any>(`${COUNTY_BASE}/v3.1/all`);
  }
}
