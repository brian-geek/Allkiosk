import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

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

const GreenCheckBox = withStyles({
  root: {
    color: "#3f51b5",
    "&$checked": {
      color: "#3f51b5",
    },
  },
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles(styles);

const QuestionPage = ({ history, handleJurorData, jurorData, userIsIdle }) => {
  const classes = useStyles();
  if (userIsIdle || !jurorData.text) {
    history.push("/");
    localStorage.removeItem("allkiosk_token");
  }

  const [unableToSubmit, setUnableToSubmit] = useState(true);
  const [result, setResult] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null,
  });

  const handleSubmit = () => {
    toastr.success("Successfully Submitted!");
    history.push("/");
  };

  useEffect(() => {
    if (
      result.question1 !== null &&
      result.question2 !== null &&
      result.question3 !== null &&
      result.question4 !== null &&
      result.question5 !== null
    ) {
      setUnableToSubmit(false);
    } else {
      setUnableToSubmit(true);
    }
  }, [result]);

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
                    Questionnaire
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
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <Typography className={classes.listText} align="left">
                      Question 1
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.contentText} align="right">
                      Yes
                      <GreenCheckBox
                        checked={result.question1 === true ? true : false}
                        onChange={(e, value) =>
                          setResult({
                            ...result,
                            question1: value ? true : null,
                          })
                        }
                      />
                      No
                      <GreenCheckBox
                        checked={result.question1 === false ? true : false}
                        onChange={(e, value) =>
                          setResult({
                            ...result,
                            question1: value ? false : null,
                          })
                        }
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="center"
                  spacing="2"
                >
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <Typography className={classes.listText} align="left">
                      Question 2
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.contentText} align="right">
                      Yes
                      <GreenCheckBox
                        checked={result.question2 === true ? true : false}
                        onChange={(e, value) =>
                          setResult({
                            ...result,
                            question2: value ? true : null,
                          })
                        }
                      />
                      No
                      <GreenCheckBox
                        checked={result.question2 === false ? true : false}
                        onChange={(e, value) =>
                          setResult({
                            ...result,
                            question2: value ? false : null,
                          })
                        }
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="center"
                  spacing="2"
                >
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <Typography className={classes.listText} align="left">
                      Question 3
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.contentText} align="right">
                      Yes
                      <GreenCheckBox
                        checked={result.question3 === true ? true : false}
                        onChange={(e, value) =>
                          setResult({
                            ...result,
                            question3: value ? true : null,
                          })
                        }
                      />
                      No
                      <GreenCheckBox
                        checked={result.question3 === false ? true : false}
                        onChange={(e, value) =>
                          setResult({
                            ...result,
                            question3: value ? false : null,
                          })
                        }
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="center"
                  spacing="2"
                >
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <Typography className={classes.listText} align="left">
                      Question 4
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.contentText} align="right">
                      Yes
                      <GreenCheckBox
                        checked={result.question4 === true ? true : false}
                        onChange={(e, value) =>
                          setResult({
                            ...result,
                            question4: value ? true : null,
                          })
                        }
                      />
                      No
                      <GreenCheckBox
                        checked={result.question4 === false ? true : false}
                        onChange={(e, value) =>
                          setResult({
                            ...result,
                            question4: value ? false : null,
                          })
                        }
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="center"
                  spacing="2"
                >
                  <Grid item xs={1} />
                  <Grid item xs={5}>
                    <Typography className={classes.listText} align="left">
                      Question 5
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography className={classes.contentText} align="right">
                      Yes
                      <GreenCheckBox
                        checked={result.question5 === true ? true : false}
                        onChange={(e, value) =>
                          setResult({
                            ...result,
                            question5: value ? true : null,
                          })
                        }
                      />
                      No
                      <GreenCheckBox
                        checked={result.question5 === false ? true : false}
                        onChange={(e, value) =>
                          setResult({
                            ...result,
                            question5: value ? false : null,
                          })
                        }
                      />
                    </Typography>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
                <Grid item container xs={12} justify="center">
                  <Grid item xs={9}>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      className={classes.btn}
                      spacing="3"
                      onClick={handleSubmit}
                      disabled={unableToSubmit}
                      fullWidth
                    >
                      Submit
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

export default connect(mapStateToProps, { handleJurorData })(QuestionPage);
