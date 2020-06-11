import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ReplyIcon from "@material-ui/icons/Reply";
import IconButton from "@material-ui/core/IconButton";

import { toastr } from "react-redux-toastr";
import { postJurorDetail } from "../../clients/api";
import { handleJurorData } from "../../redux/actions/scannerActions";

const styles = {
  logo: {
    width: "280px",
    marginTop: "50px",
    cursor: "pointer",
  },
  btn: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    fontSize: "25px",
    borderRadius: "50px",
  },
  layout: {
    height: "85vh",
  },
  textField: {
    fontWeight: 500,
    fontSize: 21,
  },
  backbtn: {
    color: "#3f51b5",
    fontSize: "75px",
  },
  form: {
    marginTop: "70px",
  },
};

const useStyles = makeStyles(styles);

const Search = ({ history, userIsIdle, handleJurorData, jurorData }) => {
  const classes = useStyles();
  const [status, setStatus] = useState("init");
  const initialSearchInfo = {
    firstName: "",
    lastName: "",
    birthDate: "",
    jurorId: "",
    groupId: "",
  };
  const [searchInfo, setSearchInfo] = useState(initialSearchInfo);
  const [unableToSearch, setUnableToSearch] = useState(true);
  const handleSearch = () => {
    postJurorDetail(searchInfo)
      .then((res) => res.text())
      .then((result) => JSON.parse(result))
      .then((result) => {
        if (result.status === "success") {
          toastr.success(result.message);
          handleJurorData(result.jurorData);
          setSearchInfo(initialSearchInfo);
          setStatus(result.status);
        } else if (result.status === "failed") {
          toastr.error(result.message);
          setSearchInfo(initialSearchInfo);
          setStatus(result.status);
        }
      });
  };

  useEffect(() => {
    if (
      searchInfo.firstName &&
      searchInfo.lastName &&
      searchInfo.birthDate &&
      searchInfo.jurorId &&
      searchInfo.groupId
    ) {
      setUnableToSearch(false);
    } else {
      setUnableToSearch(true);
    }
  }, [searchInfo]);

  if (userIsIdle) {
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
        <Grid container item xs={3} justify="column" className={classes.layout}>
          <Grid item xs={12}>
            <img
              src="https://www.tempe.gov/Home/ShowPublishedImage/51838/636936793486770000"
              alt="Court Logo"
              className={classes.logo}
              onClick={() => {
                history.push("/");
                handleJurorData({});
              }}
            />
          </Grid>
          <Grid container justify="center" alignItems="flex-end" item xs={12}>
            <Grid item>
              <IconButton
                onClick={() => {
                  history.push("/main");
                  handleJurorData({});
                }}
              >
                <ReplyIcon className={classes.backbtn} />
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
          className={classes.form}
        >
          {status === "init" ? (
            <Grid item container xs={12} justify="center" spacing="5">
              <Grid item xs={9}>
                <Typography align="left">First Name</Typography>
                <TextField
                  type="text"
                  variant="outlined"
                  value={searchInfo.firstName}
                  onChange={(e) =>
                    setSearchInfo({
                      ...searchInfo,
                      firstName: e.target.value === "" ? null : e.target.value,
                    })
                  }
                  InputProps={{ className: classes.textField }}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={9}>
                <Typography align="left">Last Name</Typography>
                <TextField
                  variant="outlined"
                  type="text"
                  value={searchInfo.lastName}
                  onChange={(e) =>
                    setSearchInfo({
                      ...searchInfo,
                      lastName: e.target.value === "" ? null : e.target.value,
                    })
                  }
                  InputProps={{ className: classes.textField }}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid container item xs={9}>
                <Typography align="left">Date of Birth</Typography>
                <TextField
                  variant="outlined"
                  type="date"
                  value={searchInfo.birthDate}
                  onChange={(e) =>
                    setSearchInfo({
                      ...searchInfo,
                      birthDate: e.target.value === "" ? null : e.target.value,
                    })
                  }
                  InputProps={{ className: classes.textField }}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={9}>
                <Typography align="left">Juror ID</Typography>
                <TextField
                  variant="outlined"
                  type="text"
                  value={searchInfo.jurorId}
                  onChange={(e) =>
                    setSearchInfo({
                      ...searchInfo,
                      jurorId: e.target.value === "" ? null : e.target.value,
                    })
                  }
                  InputProps={{ className: classes.textField }}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid item xs={9}>
                <Typography align="left">Group ID</Typography>
                <TextField
                  variant="outlined"
                  type="text"
                  value={searchInfo.groupId}
                  onChange={(e) =>
                    setSearchInfo({
                      ...searchInfo,
                      groupId: e.target.value === "" ? null : e.target.value,
                    })
                  }
                  InputProps={{ className: classes.textField }}
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
                  disabled={unableToSearch}
                  onClick={handleSearch}
                  fullWidth
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          ) : status === "success" ? (
            <Grid item container xs={12} justify="center" spacing="5">
              <Grid item xs={9}>
                <Typography variant="h5" spacing="3">
                  {jurorData.firstName} {jurorData.lastName}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5">{jurorData.scheduleTime}</Typography>
              </Grid>
              <Grid item xs={9}>
                <Button
                  variant="contained"
                  size="large"
                  className={classes.btn}
                  onClick={() => history.push("/confirm")}
                  fullWidth
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          ) : status === "failed" ? (
            <Grid item container xs={12} justify="center" spacing="3">
              <Grid item xs={9}>
                <Typography variant="h5" spacing="3">
                  Go to Service Counter
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h5">for Assistance</Typography>
              </Grid>
              <Grid item xs={9}>
                <Button
                  variant="contained"
                  size="large"
                  className={classes.btn}
                  onClick={() => history.push("/main")}
                  fullWidth
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  const { scanner } = state;
  return { jurorData: scanner.jurorData };
};

export default connect(mapStateToProps, { handleJurorData })(Search);
