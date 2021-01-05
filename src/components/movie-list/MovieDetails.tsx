import AccordionActions from "@material-ui/core/AccordionActions";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { useMovie } from "hooks/useMovies";
import useMovieWiki from "hooks/useMovieWiki";
import { SearchMovie } from "interfaces/Movie";
import React, { FC } from "react";

type Props = SearchMovie;

const MovieDetails: FC<Props> = (props) => {
  const { id, title, overview } = props;
  const { data: movie } = useMovie(id);
  const { data: wikiPage, isFetching } = useMovieWiki(title);

  return (
    <>
      <AccordionDetails>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <Typography paragraph>{wikiPage?.extract || overview}</Typography>
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
      </AccordionActions>
    </>
  );
};

export default MovieDetails;
