import React, { Component } from "react";
import { connect } from "react-redux";
import Scanner from "./Scanner";
import Result from "./Result";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { toastr } from "react-redux-toastr";
import { Typography } from "@material-ui/core";
import { postBarCodeDetail, saveBarCodeDetail } from "../../clients/api";
import { handleJurorData } from "../../redux/actions/scannerActions";

import LoadingCircle from "../../shard/LoadingCircle";
import ReplyIcon from "@material-ui/icons/Reply";
import IconButton from "@material-ui/core/IconButton";

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
  div_message: {
    maxHeight: "200px",
    overflowY: "auto",
    resize: "both",
  },
};

class ScanPage extends Component {
  state = {
    scanning: true,
    status: "waiting",
    results: [],
    scannedResult: "",
    enableToSearch: false,
    enableToContinue: false,
    scannedTime: 0,
  };

  inputRef = React.createRef();
  // _scan = () => {
  //   this.setState({ scanning: !this.state.scanning, status: "" });
  // };

  setCurrentBarCodeDetail = (result) => {
    const obj = {
      text: result,
    };
    postBarCodeDetail(obj)
      .then((res) => res.text())
      .then((result) => JSON.parse(result))
      .then((result) => {
        this.setState({ status: "finished" });
        if (result.status === "success") {
          toastr.success(result.message);
          this.setState({
            enableToContinue: true,
          });
          this.props.handleJurorData(result.jurorData);
        } else if (result.status === "failed") {
          toastr.error(result.message);
          this.setState({
            enableToSearch: true,
          });
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  saveCurrentBarCodeDetail = () => {
    const obj = {
      // format: this.state.results[0].codeResult.format,
      text: this.state.results[0].codeResult.code,
    };
    saveBarCodeDetail(obj)
      .then((res) => res.text())
      .then((result) => JSON.parse(result))
      .then((result) => {
        if (result.status === "success") {
          toastr.success(result.message);
        } else if (result.status === "failed") {
          toastr.error(result.message);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  _onDetected = (result) => {
    this.props.setIsTimeOut(false);
    this.setCurrentBarCodeDetail(result.codeResult.code);
    this.setState(
      {
        results: [result],
        scanning: false,
        status: "waiting",
      },
      () => {
        setTimeout(() => {
          this.setState({
            scanning: true,
            status: "scanning...",
            results: [],
            enableToSearch: false,
          });
        }, 2000);
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.scannedTime < 1 && this.state.scannedResult !== "") {
      if (prevState.scannedResult !== this.state.scannedResult) {
        this.setCurrentBarCodeDetail(this.state.scannedResult);
        this.setState({
          scannedTime: this.state.scannedTime + 1,
          status: "scanning...",
        });
      }
    }
  }

  render() {
    if (this.props.userIsIdle) {
      this.props.history.push("/");
    }
    return (
      <div
        onClick={() => {
          this.inputRef.current.focus();
        }}
      >
        <Grid
          container
          xs={12}
          spacing="2"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid
            container
            item
            xs={3}
            justify="column"
            style={{ height: "85vh" }}
          >
            <Grid item xs={12}>
              <img
                src="https://www.tempe.gov/Home/ShowPublishedImage/51838/636936793486770000"
                alt="Court Logo"
                style={styles.logo}
                onClick={() => {
                  this.props.handleJurorData({});
                  this.props.history.push("/");
                }}
              />
            </Grid>
            <Grid container justify="center" alignItems="flex-end" item xs={12}>
              <Grid item>
                <IconButton>
                  <ReplyIcon
                    style={{ color: "#3f51b5", fontSize: "75px" }}
                    onClick={() => {
                      this.props.handleJurorData({});
                      this.props.history.push("/main");
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
            justify="column"
            alignItems="center"
            style={{ height: "80vh" }}
          >
            {this.props.scannerMode === "webcam" ? (
              <>
                <Grid item container xs={12} justify="center">
                  <Grid item xs={9}>
                    <div>
                      <br />
                      <br />
                      <div className="header">
                        <div>
                          <Typography variant="h6">
                            {this.state.status}
                          </Typography>
                        </div>
                        <br />
                        {!this.state.scanning ? (
                          <Button
                            variant="contained"
                            onClick={this.saveCurrentBarCodeDetail}
                            size="middle"
                          >
                            Save Current Data
                          </Button>
                        ) : null}
                        {/* <div onClick={this._scan}>
                      {this.state.scanning ? "Stop" : "Start"}
                       </div> */}
                        <ul className="results">
                          {this.state.results.map((result, i) => (
                            <Result
                              key={result.codeResult.code + i}
                              result={result}
                            />
                          ))}
                        </ul>
                      </div>
                      <div style={{ height: "480px" }}>
                        {this.state.scanning ? (
                          <Scanner onDetected={this._onDetected} />
                        ) : null}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </>
            ) : this.props.scannerMode === "scanner" ? (
              <Grid item container xs={12} justify="center">
                <Grid item>
                  <input
                    autoFocus
                    ref={this.inputRef}
                    value={this.state.scannedResult}
                    onChange={(e) =>
                      this.setState({ scannedResult: e.target.value })
                    }
                    style={{ opacity: 0 }}
                  />
                </Grid>
              </Grid>
            ) : null}
            <Grid item container xs={12} justify="center" spacing="3">
              <Grid item xs={12}>
                <Typography variant="h6" align="center" fullWidth>
                  {this.state.status === "finished" ? null : this.state.status}
                </Typography>
              </Grid>
              {this.state.status === "waiting" ? (
                <LoadingCircle size={110} />
              ) : null}
              <Grid item xs={9}>
                {this.state.enableToSearch && (
                  <Grid
                    container
                    justify="center"
                    direction="column"
                    spacing="5"
                  >
                    <Grid item>
                      <Button
                        variant="contained"
                        size="large"
                        style={{
                          backgroundColor: "#3f51b5",
                          color: "#fff",
                          fontSize: "25px",
                          borderRadius: "50px",
                        }}
                        onClick={() => {
                          this.setState({
                            scannedResult: "",
                            scannedTime: 0,
                            enableToSearch: false,
                            status: "waiting",
                          });
                          this.inputRef.current.focus();
                        }}
                        fullWidth
                      >
                        Scan Barcode Again
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        size="large"
                        style={{
                          backgroundColor: "#3f51b5",
                          color: "#fff",
                          fontSize: "25px",
                          borderRadius: "50px",
                        }}
                        onClick={() => this.props.history.push("/search")}
                        fullWidth
                      >
                        Search By ID
                      </Button>
                    </Grid>
                  </Grid>
                )}
                {/* {this.props.jurorData === {} ? null : (
                  <>
                    <Typography variant="h5" spacing="3">
                      {this.props.jurorData.firstName}{" "}
                      {this.props.jurorData.lastName}
                    </Typography>
                    <Typography variant="h5">
                      {this.props.jurorData.scheduleTime}
                    </Typography>
                  </>
                )} */}
                {this.state.enableToContinue && (
                  <Grid item container xs={12} justify="center" spacing="3">
                    <Grid item xs={12}>
                      <Typography variant="h5" spacing="3">
                        {this.props.jurorData.firstName}{" "}
                        {this.props.jurorData.lastName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h5">
                        {this.props.jurorData.scheduleTime}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        size="large"
                        style={{
                          backgroundColor: "#3f51b5",
                          color: "#fff",
                          fontSize: "25px",
                          borderRadius: "50px",
                        }}
                        onClick={() => this.props.history.push("/confirm")}
                        fullWidth
                      >
                        Continue
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { scanner } = state;
  return { scannerMode: scanner.scannerMode, jurorData: scanner.jurorData };
};

export default connect(mapStateToProps, { handleJurorData })(ScanPage);
