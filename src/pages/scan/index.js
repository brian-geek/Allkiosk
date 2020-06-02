import React, { Component } from "react";
import Scanner from "./Scanner";
import Result from "./Result";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { toastr } from "react-redux-toastr";
import { Typography } from "@material-ui/core";
import { postBarCodeDetail, saveBarCodeDetail } from "../../clients/api";

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
    status: "",
    results: [],
    enableToSearch: false,
  };

  // _scan = () => {
  //   this.setState({ scanning: !this.state.scanning, status: "" });
  // };

  setCurrentBarCodeDetail = (result) => {
    const obj = {
      format: result.format,
      text: result.code,
    };
    postBarCodeDetail(obj)
      .then((res) => res.text())
      .then((result) => JSON.parse(result))
      .then((result) => {
        if (result.status === "success") {
          toastr.success(result.message);
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
      format: this.state.results[0].codeResult.format,
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
    this.setCurrentBarCodeDetail(result.codeResult);
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

  render() {
    if (this.props.userIsIdle) {
      this.props.history.push("/");
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
                onClick={() => this.props.history.push("/")}
              />
            </Grid>
            <Grid container justify="center" alignItems="flex-end" item xs={12}>
              <Grid item>
                <IconButton>
                  <ReplyIcon
                    style={{ color: "#3f51b5", fontSize: "75px" }}
                    onClick={() => this.props.history.push("/main")}
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
            <Grid item container xs={12} justify="center">
              <Grid item xs={9}>
                <div>
                  <br />
                  <br />
                  <div className="header">
                    <div>
                      <Typography variant="h6">{this.state.status}</Typography>
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
            <Grid item container xs={12} justify="center">
              <Grid item xs={9}>
                {this.state.enableToSearch && (
                  <Button
                    variant="contained"
                    size="large"
                    style={{
                      height: "125px",
                      backgroundColor: "#3f51b5",
                      color: "#fff",
                      fontSize: "35px",
                      borderRadius: "25px",
                    }}
                    onClick={() => this.props.history.push("/search")}
                    fullWidth
                  >
                    Search By ID
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ScanPage;
