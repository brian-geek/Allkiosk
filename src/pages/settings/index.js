import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
// import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import ForwardIcon from "@material-ui/icons/Forward";
import IconButton from "@material-ui/core/IconButton";

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
  },
  headerText: {
    color: "#fff",
    fontSize: "35px",
    fontWeight: 500,
  },
  contentText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: "18px",
  },
  settingsText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: "21px",
  },
  forwardIcon: {
    color: "#fff",
    fontSize: "28px",
  },
  sliderText: {
    color: "#fff",
  },
};

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = makeStyles(styles);

const Settings = ({ history, userIsIdle }) => {
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
        </Grid>
        <Grid item container xs={9}>
          <div className={classes.layout}>
            <Grid container item xs={12} alignItems="center" spacing="10">
              <Grid item container xs={12} justify="center">
                <Grid item container xs={12} justify="center">
                  <Grid item>
                    <br />
                    <br />
                    <br />
                    <Typography className={classes.headerText}>
                      SETTINGS
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12} alignItems="center" spacing="8">
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="flex-start"
                  spacing="2"
                >
                  <Grid item xs={2} />
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Idle Timer
                    </Typography>
                  </Grid>
                  <Grid item container xs={7} justify="space-between">
                    <Grid
                      item
                      container
                      xs={12}
                      alignItems="center"
                      spacing="2"
                    >
                      <Grid item xs={4}>
                        <Typography
                          align="center"
                          className={classes.sliderText}
                        >
                          1 min
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <PrettoSlider fullWidth />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      alignItems="center"
                      spacing="2"
                    >
                      <Grid item xs={2} />
                      <Grid item xs={4}>
                        <Typography className={classes.sliderText}>
                          1 min
                        </Typography>
                      </Grid>
                      <Grid item xs={4} />
                      <Grid item container justify="flex-end" xs={2}>
                        <Grid>
                          <Typography className={classes.sliderText}>
                            1 min
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="flex-start"
                  spacing="2"
                >
                  <Grid item xs={2} />
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Reset Timer
                    </Typography>
                  </Grid>
                  <Grid item container xs={7} justify="space-between">
                    <Grid
                      item
                      container
                      xs={12}
                      alignItems="center"
                      spacing="2"
                    >
                      <Grid item xs={4}>
                        <Typography
                          align="center"
                          className={classes.sliderText}
                        >
                          1 min
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <PrettoSlider fullWidth />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      alignItems="center"
                      spacing="2"
                    >
                      <Grid item xs={2} />
                      <Grid item xs={4}>
                        <Typography className={classes.sliderText}>
                          1 min
                        </Typography>
                      </Grid>
                      <Grid item xs={4} />
                      <Grid item container justify="flex-end" xs={2}>
                        <Grid>
                          <Typography className={classes.sliderText}>
                            1 min
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="center"
                  spacing="2"
                >
                  <Grid item xs={2} />
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Display Wake Settings
                    </Typography>
                  </Grid>
                  <Grid item xs={7} container justify="flex-end">
                    <IconButton>
                      <ForwardIcon className={classes.forwardIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="center"
                  spacing="2"
                >
                  <Grid item xs={2} />
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Camera
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    container
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography className={classes.contentText} align="left">
                        Surface Go
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <EditIcon className={classes.settingsText} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="center"
                  spacing="2"
                >
                  <Grid item xs={2} />
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Printer
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    container
                    justify="flex-end"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography className={classes.contentText} align="left">
                        Oki B4600
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <EditIcon className={classes.settingsText} />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="center"
                  spacing="2"
                >
                  <Grid item xs={2} />
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Go to Windows Admin
                    </Typography>
                  </Grid>
                  <Grid item xs={7} container justify="flex-end">
                    <IconButton>
                      <ForwardIcon className={classes.forwardIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Settings;
