import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = {
  logo: {
    width: "280px",
    marginTop: "50px",
    cursor: "pointer",
  },
  layout: {
    height: "110vh",
    width: "100%",
    backgroundColor: "#3f51b5",
    opacity: 0.9,
    cursor: "pointer",
  },
  container: {
    height: "100vh",
  },
  titleText: {
    color: "#fff",
    fontSize: "70px",
    fontWeight: 800,
  },
  bottomText: {
    color: "#fff",
    fontSize: "35px",
    fontWeight: 500,
  },
};

const useStyles = makeStyles(styles);

const HomePage = ({ history }) => {
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
          <Grid item container xs={12} justify="center" alignItems="center">
            <Grid item>
              <div
                className="gear"
                id="gear2"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/settings")}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={9}>
          <div className={classes.layout}>
            <Grid
              container
              item
              xs={12}
              justify="column"
              alignItems="center"
              className={classes.container}
              onClick={() => history.push("/main")}
            >
              <Grid item container xs={12} justify="center">
                <Grid item>
                  <Typography className={classes.titleText}>
                    JURY DUTY
                  </Typography>
                  <Typography className={classes.titleText}>
                    CHECK-IN
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12} justify="center">
                <Grid item>
                  <Typography className={classes.bottomText}>
                    TAP HERE TO CONTINUE
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;
