import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";

import LoadingCircle from "../../shard/LoadingCircle";
import ReplyIcon from "@material-ui/icons/Reply";
import IconButton from "@material-ui/core/IconButton";
import { handleJurorData } from "../../redux/actions/scannerActions";

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
    height: "80vh",
  },
  headerText: {
    fontSize: "35px",
    fontWeight: 500,
  },
  div_message: {
    maxHeight: "200px",
    overflowY: "auto",
    resize: "both",
  },
  replyIcon: {
    color: "#3f51b5",
    fontSize: "75px",
  },
  listText: {
    fontWeight: 500,
    fontSize: "21px",
  },
  contentText: {
    fontWeight: 500,
    fontSize: "25px",
  },
  btn: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    fontSize: "25px",
    borderRadius: "50px",
  },
};

const useStyles = makeStyles(styles);

const ConfirmPage = ({ history, handleJurorData, jurorData, userIsIdle }) => {
  const classes = useStyles();
  if (userIsIdle || !jurorData.text) {
    history.push("/");
  }

  return (
    <div>
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
              className={classes.logo}
              onClick={() => {
                handleJurorData({});
                history.push("/");
              }}
            />
          </Grid>
          <Grid container justify="center" alignItems="flex-end" item xs={12}>
            <Grid item>
              <IconButton>
                <ReplyIcon
                  className={classes.replyIcon}
                  onClick={() => {
                    handleJurorData({});
                    history.push("/main");
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={9}
          justify="center"
          alignItems="center"
          className={classes.layout}
        >
          {jurorData.text ? (
            <Grid container item xs={12} alignItems="center" spacing="10">
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
              <Grid item container xs={12} alignItems="center" spacing="8">
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="center"
                  spacing="2"
                >
                  <Grid item xs={2} />
                  <Grid item xs={4}>
                    <Typography className={classes.listText} align="left">
                      First Name
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.contentText} align="right">
                      {jurorData.firstName}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} />
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
                  <Grid item xs={4}>
                    <Typography className={classes.listText} align="left">
                      Last Name
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.contentText} align="right">
                      {jurorData.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} />
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
                  <Grid item xs={4}>
                    <Typography className={classes.listText} align="left">
                      Address
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.contentText} align="right">
                      {jurorData.address}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} />
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
                  <Grid item xs={4}>
                    <Typography className={classes.listText} align="left">
                      Phone
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.contentText} align="right">
                      {jurorData.phone}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} />
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
                  <Grid item xs={4}>
                    <Typography className={classes.listText} align="left">
                      Jury Schedule
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography className={classes.contentText} align="right">
                      {jurorData.scheduleTime}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} />
                </Grid>
                <Grid item container xs={12} justify="center">
                  <Grid item xs={9}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      className={classes.btn}
                      spacing="3"
                      onClick={() => history.push("/questionnaire")}
                      fullWidth
                    >
                      Confirm
                      <CheckIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <Grid item justify="center" direction="column">
              <Typography variant="h6" align="center">
                No Juror Data...
              </Typography>
              <Grid item>
                <LoadingCircle size={110} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { scanner } = state;
  return { jurorData: Object.assign({}, scanner.jurorData) };
};

export default connect(mapStateToProps, { handleJurorData })(ConfirmPage);
