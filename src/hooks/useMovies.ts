import { gql, request } from "graphql-request";
import { Movie, SearchMovies } from "interfaces/Movie";
import { useQuery } from "react-query";

const endpoint = "https://tmdb.apexlab.io/graphql";

const searchQuery = gql`
  query Movies($query: SearchMovieQuery) {
    searchMovie(query: $query) {
      results {
        id
        title
        original_title
        overview
      }
    }
  }
`;

const movieQuery = gql`
  query Movie($id: Int!) {
    getMovie(movie_id: $id) {
      id
      original_title
      external_ids {
        imdb_id
      }
    }
  }
`;

export const useMovies = (searchTerm: string = "Good will") => {
  return useQuery(
    ["movies", { searchTerm }],
    () => {
      return request<{ searchMovie: SearchMovies }>(endpoint, searchQuery, {
        query: { query: searchTerm },
      }).then(({ searchMovie }) => searchMovie);
    },
    { retry: false }
  );
};

export const useMovie = (id: number) => {
  return useQuery<Movie>(
    ["movie", { id }],
    () => {
      return request<{ getMovie: Movie }>(endpoint, movieQuery, { id }).then(
        ({ getMovie }) => getMovie
      );
    },
    { retry: false }
  );
};
