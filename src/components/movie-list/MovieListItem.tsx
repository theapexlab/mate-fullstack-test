import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SearchMovie } from "interfaces/Movie";
import React, { FC } from "react";
import MovieDetails from "./MovieDetails";

interface Props {
  searchMovie: SearchMovie;
  onSelect?: (movie: SearchMovie) => void;
}

export const MovieListItem: FC<Props> = (props) => {
  const { searchMovie, onSelect } = props;

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{searchMovie.title}</Typography>
      </AccordionSummary>
      <MovieDetails searchMovie={searchMovie} onSelect={onSelect} />
    </Accordion>
  );
};
