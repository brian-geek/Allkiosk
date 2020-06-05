import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { toastr } from "react-redux-toastr";

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
  subHeaderText: {
    color: "#fff",
    fontSize: "25px",
    fontWeight: 400,
  },
  textField: {
    fontWeight: 500,
    fontSize: 21,
    backgroundColor: "#fff",
    borderRadius: "15px",
  },
  formText: {
    color: "#fff",
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 15,
  },
};

const useStyles = makeStyles(styles);

const AdminLogIn = ({ history, userIsIdle }) => {
  const classes = useStyles();
  const initialAdminKey = {
    userName: "",
    password: "",
  };
  const [adminKey, setAdminKey] = useState(initialAdminKey);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = () => {
    if (adminKey.userName === "paceme999" && adminKey.password === "tempe999") {
      localStorage.setItem("allkiosk_token", "paceme999");
      toastr.success("Login Success.");
      history.push("/settings");
    } else {
      setAdminKey(initialAdminKey);
      toastr.error("Login Failed.");
    }
  };

  useEffect(() => {
    if (adminKey.userName !== "" && adminKey.password !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [adminKey]);

  if (userIsIdle) {
    history.push("/");
    setAdminKey(initialAdminKey);
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
                <Grid item>
                  <br />
                  <br />
                  <br />
                  <Typography className={classes.headerText}>
                    SETTINGS
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12} justify="center">
                <Grid item>
                  <br />
                  <Typography className={classes.subHeaderText}>
                    ADMIN REQUIRED
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs={12} direction="column" spacing="5">
                <Grid item container xs={12} justify="center">
                  <Grid item xs={5}>
                    <Typography variant="h6" className={classes.formText}>
                      User Name
                    </Typography>
                    <br />
                    <TextField
                      variant="outlined"
                      value={adminKey.userName}
                      onChange={(e) =>
                        setAdminKey({ ...adminKey, userName: e.target.value })
                      }
                      type="text"
                      InputProps={{ className: classes.textField }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} justify="center">
                  <Grid item xs={5}>
                    <Typography variant="h6" className={classes.formText}>
                      Password
                    </Typography>
                    <br />
                    <TextField
                      variant="outlined"
                      value={adminKey.password}
                      onChange={(e) =>
                        setAdminKey({ ...adminKey, password: e.target.value })
                      }
                      type="password"
                      InputProps={{ className: classes.textField }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12} justify="center">
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={disabled}
                >
                  <Typography className={classes.buttonText}>Enter</Typography>
                  <ArrowForwardIcon />
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AdminLogIn;
