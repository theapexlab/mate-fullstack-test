import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { SearchMovie } from "interfaces/Movie";
import React, { FC } from "react";
import MovieDetails from "./MovieDetails";

type Props = SearchMovie;

export const MovieListItem: FC<Props> = (props) => {
  const { title } = props;

  return (
    <Accordion TransitionProps={{ unmountOnExit: true }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <MovieDetails {...props} />
    </Accordion>
  );
};
