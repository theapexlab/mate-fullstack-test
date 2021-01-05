import { InputBase, Paper } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import { Field, Form, FormikProvider, useFormik } from "formik";
import React, { FC } from "react";

interface Props {
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
}

export const Header: FC<Props> = (props) => {
  const { searchTerm, onSearchTermChange } = props;

  const formik = useFormik({
    initialValues: {
      searchTerm,
    },
    onSubmit: (values) => {
      onSearchTermChange(values.searchTerm);
    },
  });

  return (
    <AppBar position="static">
      <Toolbar>
        <Box marginLeft="24px">
          <Typography>Movies</Typography>
        </Box>
        <FormikProvider value={formik}>
          <Form>
            <Paper>
              <Box
                display="flex"
                alignItems="center"
                padding="0 0 0 16px"
              >
                <Field
                  name="searchTerm"
                  as={InputBase}
                  variant="outlined"
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
                <Button variant="contained">
                  <SearchIcon />
                </Button>
              </Box>
            </Paper>
          </Form>
        </FormikProvider>
      </Toolbar>
    </AppBar>
  );
};
