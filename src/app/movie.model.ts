import { FormArray, FormControl } from '@angular/forms';

export interface result {
  Search: movieInOverall[];
}

export interface movieInOverall {
  Title: string;
  Year: string | number;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface movieInDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons: string;
  Response: string;
}

export interface CountryList {
  name: CountryName;
  population: number;
  flags: CountryFlag;
}

export interface CountryName {
  common: string;
  official: string;
}

export interface CountryFlag {
  png: string;
  svg: string;
}

export enum Genre {
  Action = 'Action',
  Adventure = 'Adventure',
  Animation = 'Animation',
  Comedy = 'Comedy',
  Crime = 'Crime',
  Drama = 'Drama',
  Fantasy = 'Fantasy',
  Horror = 'Horror',
  Musical = 'Musical',
  Mystery = 'Mystery',
  Romance = 'Romance',
  ScienceFiction = 'Science Fiction',
  Thriller = 'Thriller',
  War = 'War',
  Western = 'Western',
}

export enum MovieType {
  Movie = 'Movie',
  Series = 'Series',
}

export interface RegisterMovie {
  movieName: FormControl<string | null>;
  movieType: FormControl<string | null>;
  seriesEpisodesNum?: FormControl<string | number | null>;
  movieRuntime?: FormControl<number | string | null>;
  movieReleaseDate: FormControl<string | null>;
  movieCountries: FormArray<FormControl<string | null>>;
  moviePremierePlace: FormArray<FormControl<string | null>>;
  movieGenre?: FormArray<FormControl<string | null>>;
  movieRating: FormControl<number | null>;
}

export interface AddMyMovie {
  movieName: string | null;
  movieType: string | null;
  seriesEpisodesNum?: string | number | null;
  movieRuntime?: number | string | null;
  movieReleaseDate: string | null;
  movieCountries: (string | null)[];
  moviePremierePlace: (string | null)[];
  movieGenre?: (string | null)[];
  movieRating: number | null;
}
