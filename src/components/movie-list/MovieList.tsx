import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { useMovies } from "hooks/useMovies";
import React, { FC } from "react";
import { MovieListItem } from "./MovieListItem";

interface Props {
  searchTerm: string;
}

export const MovieList: FC<Props> = (props) => {
  const { searchTerm } = props;
  const { data: { results = [] } = {}, isFetching } = useMovies(searchTerm);

  return (
    <Box marginX="10vw" marginY="24px" display="flex" flexDirection="column">
      {isFetching && <CircularProgress />}
      {!isFetching &&
        results.map((item) => <MovieListItem key={item.id} {...item} />)}
      {!isFetching && results.length === 0 && (
        <Typography>No result. Please use the search box above!</Typography>
      )}
    </Box>
  );
};
