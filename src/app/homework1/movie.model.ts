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

export interface ChosenMovies {
  Poster: string;
  Title: string;
  imdbID: string;
  MyID: string;
  MyReview: string;
  Type: string;
  Year: string;
  Rated: string;
  Runtime: string;
}
