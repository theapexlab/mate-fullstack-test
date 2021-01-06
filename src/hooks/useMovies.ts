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

const recommendedQuery = gql`
  query RecommendedMovies($id: Int!) {
    getRecommendedMovies(movie_id: $id, page: 1) {
      results {
        id
        title
        original_title
        overview
      }
    }
  }
`;

export const useMovies = (searchTerm: string) => {
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
    ["movies", { id }],
    () => {
      return request<{ getMovie: Movie }>(endpoint, movieQuery, { id }).then(
        ({ getMovie }) => getMovie
      );
    },
    { retry: false }
  );
};

export const useRecommendedMovies = (id: number) => {
  return useQuery(["movies", { id, recommended: true }], () => {
    return request<{ getRecommendedMovies: SearchMovies }>(
      endpoint,
      recommendedQuery,
      { id }
    ).then(({ getRecommendedMovies }) => getRecommendedMovies);
  });
};
