import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import ForwardIcon from "@material-ui/icons/Forward";
import IconButton from "@material-ui/core/IconButton";
import ReplyIcon from "@material-ui/icons/Reply";

import { connect } from "react-redux";
import { PrettoSlider } from "../../shard/PrettoSlider";

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

const useStyles = makeStyles(styles);

const Settings = ({ history, userIsIdle, scannerMode }) => {
  const classes = useStyles();
  const [idleTime, setIdleTime] = useState(0.5);
  const [resetTime, setResetTime] = useState(5);

  const foramtIdleTime = (idleTime) => {
    const idleMin = idleTime - (idleTime % 1);
    const idleSec = idleTime % 1;
    if (idleSec === 0) {
      return `${idleTime} min`;
    } else {
      if (idleMin === 0) {
        return `${(idleSec * 60).toFixed(0)} sec`;
      } else {
        return `${idleMin} min ${(idleSec * 60).toFixed(0)} sec`;
      }
    }
  };

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
        <Grid container item xs={3} justify="column" style={{ height: "85vh" }}>
          <Grid item xs={12}>
            <img
              src="https://www.tempe.gov/Home/ShowPublishedImage/51838/636936793486770000"
              alt="Court Logo"
              style={styles.logo}
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
                          {foramtIdleTime(idleTime)}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <PrettoSlider
                          onChange={(e, newValue) =>
                            setIdleTime(0.5 + (4.5 * newValue) / 100)
                          }
                          fullWidth
                        />
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
                          30 s
                        </Typography>
                      </Grid>
                      <Grid item xs={4} />
                      <Grid item container justify="flex-end" xs={2}>
                        <Grid>
                          <Typography className={classes.sliderText}>
                            5 min
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
                          {`${resetTime} s`}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <PrettoSlider
                          onChange={(e, newValue) =>
                            setResetTime(5 + (25 * newValue) / 100)
                          }
                          aria-labelledby="input-slider"
                          fullWidth
                        />
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
                          5 s
                        </Typography>
                      </Grid>
                      <Grid item xs={4} />
                      <Grid item container justify="flex-end" xs={2}>
                        <Grid>
                          <Typography className={classes.sliderText}>
                            30 s
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
                      <ForwardIcon
                        className={classes.forwardIcon}
                        onClick={() => history.push("/display_settings")}
                      />
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

const mapStateToProps = (state) => {
  const { scanner } = state;
  return { scannerMode: scanner.scannerMode };
};

export default connect(mapStateToProps, null)(Settings);
