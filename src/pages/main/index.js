import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ReplyIcon from "@material-ui/icons/Reply";

const styles = {
  logo: {
    width: "280px",
    marginTop: "50px",
    cursor: "pointer",
  },
  btn: {
    height: "125px",
    backgroundColor: "#3f51b5",
    color: "#fff",
    fontSize: "35px",
    borderRadius: "25px",
  },
  layout: {
    height: "85vh",
  },
};

const useStyles = makeStyles(styles);

const Main = ({ history, userIsIdle }) => {
  const classes = useStyles();
  if (userIsIdle) {
    history.push("/");
    localStorage.removeItem("allkiosk_token");
  }
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
          <Grid container justify="center" alignItems="flex-end" item xs={12}>
            <Grid item>
              <IconButton>
                <ReplyIcon
                  style={{ color: "#3f51b5", fontSize: "75px" }}
                  onClick={() => history.push("/")}
                />
              </IconButton>
            </Grid>
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
          <Grid item container xs={12} justify="center">
            <Grid item xs={9}>
              <Button
                variant="contained"
                size="large"
                className={classes.btn}
                onClick={() => history.push("/scan")}
                fullWidth
              >
                Scan Barcode
              </Button>
            </Grid>
          </Grid>
          <Grid item container xs={12} justify="center">
            <Grid item xs={9}>
              <Button
                variant="contained"
                size="large"
                className={classes.btn}
                onClick={() => history.push("/search")}
                fullWidth
              >
                Search By ID
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
