import AccordionActions from "@material-ui/core/AccordionActions";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { useMovie } from "hooks/useMovies";
import useMovieWiki from "hooks/useMovieWiki";
import { SearchMovie } from "interfaces/Movie";
import React, { FC, useCallback } from "react";

interface Props {
  searchMovie: SearchMovie;
  onSelect?: (movie: SearchMovie) => void;
}

const MovieDetails: FC<Props> = (props) => {
  const { searchMovie, onSelect } = props;
  // "id" field is string when receive recommended movies, so it must be converted to Int
  const { data: movie } = useMovie(+searchMovie.id);
  const { data: wikiPage, isFetching } = useMovieWiki(searchMovie.title);

  const handleSelect = useCallback(() => {
    if (onSelect) {
      onSelect(searchMovie);
    }
  }, [onSelect, searchMovie]);

  return (
    <>
      <AccordionDetails>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <Typography paragraph>{wikiPage?.extract || searchMovie.overview}</Typography>
        )}
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        {movie?.external_ids.imdb_id && (
          <Link
            href={`https://imdb.com/title/${movie.external_ids.imdb_id}`}
            target="_blank"
          >
            Open on IMDB
          </Link>
        )}
        {wikiPage?.title && (
          <Link
            href={`https://en.wikipedia.com/wiki/${wikiPage.title}`}
            target="_blank"
          >
            Open on wikipedia
          </Link>
        )}
        {onSelect && (
          <Button variant="contained" color="primary" onClick={handleSelect}>
            Show recommended moview
          </Button>
        )}
      </AccordionActions>
    </>
  );
};

export default MovieDetails;
