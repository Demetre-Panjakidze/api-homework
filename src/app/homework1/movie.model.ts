// {
//   "Search": [
//     {
//       "Title": "The Office",
//       "Year": "2005–2013",
//       "imdbID": "tt0386676",
//       "Type": "series",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_SX300.jpg"
//     },
//     {
//       "Title": "The Office",
//       "Year": "2001–2003",
//       "imdbID": "tt0290978",
//       "Type": "series",
//       "Poster": "https://m.media-amazon.com/images/M/MV5BYWI2YmI2ZmMtMTZjMC00MzMzLWI5ODItNDY1OTg3YjNmZmUxXkEyXkFqcGdeQXVyNDA5NTgxNjU@._V1_SX300.jpg"
//     },
//   ]
// }
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

/*
{
  "Title": "Avatar",
  "Year": "2009",
  "Rated": "PG-13",
  "Released": "18 Dec 2009",
  "Runtime": "162 min",
  "Genre": "Action, Adventure, Fantasy",
  "Director": "James Cameron",
  "Writer": "James Cameron",
  "Actors": "Sam Worthington, Zoe Saldana, Sigourney Weaver",
  "Plot": "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
  "Language": "English, Spanish",
  "Country": "United States",
  "Awards": "Won 3 Oscars. 89 wins & 131 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
  "Ratings": [
    {
      "Source": "Internet Movie Database",
      "Value": "7.9/10"
    },
    {
      "Source": "Rotten Tomatoes",
      "Value": "82%"
    },
    {
      "Source": "Metacritic",
      "Value": "83/100"
    }
  ],
  "Metascore": "83",
  "imdbRating": "7.9",
  "imdbVotes": "1,313,610",
  "imdbID": "tt0499549",
  "Type": "movie",
  "DVD": "22 Apr 2010",
  "BoxOffice": "$785,221,649",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}

*/
