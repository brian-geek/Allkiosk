import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
// import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import ReplyIcon from "@material-ui/icons/Reply";

import { PrettoSlider } from "../../shard/PrettoSlider";
import { WhiteCheckbox } from "../../shard/WhiteCheckbox";

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
  subHeaderText: {
    color: "#fff",
    fontSize: "25px",
    fontWeight: 400,
  },
  settingsText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: "21px",
  },
  sliderText: {
    color: "#fff",
  },
};

const useStyles = makeStyles(styles);

const DisplaySettings = ({ history, userIsIdle }) => {
  const classes = useStyles();
  const [checkedDays, setCheckedDays] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  if (userIsIdle) {
    history.push("/");
    localStorage.removeItem("allkiosk_token");
  }

  if (!localStorage.allkiosk_token) {
    history.push("/");
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
                  onClick={() => history.push("/settings")}
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
              <Grid item container xs={12} justify="center">
                <Grid item>
                  <Typography className={classes.subHeaderText}>
                    Display Wake Settings
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12} alignItems="center" spacing="5">
                {days.map((day, idx) => (
                  <Grid
                    key={idx}
                    item
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing="2"
                    xs={12}
                  >
                    <Grid item xs={2}>
                      <Typography
                        align="right"
                        className={classes.settingsText}
                        fullWidth
                      >
                        {day}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <WhiteCheckbox
                        checked={checkedDays.includes(day)}
                        onChange={(e, value) => {
                          setCheckedDays(
                            value
                              ? checkedDays.concat([day])
                              : checkedDays.filter((cDay) => cDay !== day)
                          );
                        }}
                      />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={1}>
                      <Typography
                        align="right"
                        className={classes.sliderText}
                        fullWidth
                      >
                        8AM
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <PrettoSlider
                        defaultValue={[20, 50]}
                        fullWidth
                        disabled={!checkedDays.includes(day)}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <Typography
                        align="left"
                        className={classes.sliderText}
                        fullWidth
                      >
                        5PM
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default DisplaySettings;
