import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  logo: {
    width: "280px",
    marginTop: "50px",
    cursor: 'pointer'
  },
  btn: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    fontSize: "25px",
    borderRadius: "50px",
  },
  layout: {
    height: "90vh",
  },
};

const useStyles = makeStyles(styles);

const Search = ({ history }) => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        xs={12}
        spacing="2"
        justify="space-between"
        alignItems="stretch"
      >
        <Grid container item xs={3} justify="column">
          <Grid item xs={12}>
            <img
              src="https://www.tempe.gov/Home/ShowPublishedImage/51838/636936793486770000"
              alt="Court Logo"
              className={classes.logo}
              onClick={() => history.push("/")}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={9}
          justify="column"
          alignItems="center"
          className={classes.layout}
        >
          <Grid item container xs={12} justify="center" spacing="5">
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                type="text"
                label="First Name"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                type="text"
                label="Last Name"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                type="text"
                label="Date of Birth"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                type="text"
                label="Juror ID"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                type="text"
                label="Group ID"
                fullWidth
              ></TextField>
            </Grid>
            <Grid item xs={9}>
              <br />
            </Grid>
            <Grid item xs={9}>
              <Button
                variant="contained"
                size="large"
                className={classes.btn}
                fullWidth
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Search;
