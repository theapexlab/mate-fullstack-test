import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { useMovies, useRecommendedMovies } from "hooks/useMovies";
import { SearchMovie, SearchMovies } from "interfaces/Movie";
import React, { FC } from "react";
import { MovieListItem } from "./MovieListItem";

interface Props {
  searchTerm: string;
  onSelect: (movie: SearchMovie) => void;
}

export const MovieList: FC<Props> = (props) => {
  const { searchTerm, onSelect } = props;
  const { data: { results = [] } = {}, isFetching } = useMovies(searchTerm);

  return <MovieListView results={results} isFetching={isFetching} onSelect={onSelect} />;
};

interface RecommendedProps {
  id: number;
  onSelect: (movie: SearchMovie) => void;
}

export const RecommendedMoveList: FC<RecommendedProps> = (props) => {
  const { id, onSelect } = props;
  const { data: { results = [] } = {}, isFetching } = useRecommendedMovies(+id);

  return <MovieListView results={results} isFetching={isFetching} onSelect={onSelect} />;
};

interface ViewProps {
  isFetching: boolean;
  results: SearchMovies["results"];
  onSelect?: (movie: SearchMovie) => void;
}

export const MovieListView: FC<ViewProps> = (props) => {
  const { results, isFetching, onSelect } = props;

  return (
    <Box marginX="10vw" marginY="24px" display="flex" flexDirection="column">
      {isFetching && <CircularProgress />}
      {!isFetching &&
        results.map((item) => (
          <MovieListItem key={item.id} searchMovie={item} onSelect={onSelect} />
        ))}
      {!isFetching && results.length === 0 && (
        <Typography>No result. Please use the search box above!</Typography>
      )}
    </Box>
  );
};
