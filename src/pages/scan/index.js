import React, { useEffect, useState } from "react";
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

const ScanPage = (props) => {
  const {
    scannerMode,
    jurorData,
    handleJurorData,
    userIsIdle,
    setIsTimeOut,
    history,
  } = props;
  const [scanning, setScanning] = useState(true);
  const [status, setStatus] = useState("waiting");
  const [results, setResults] = useState([]);
  const [scannedResult, setScannedResult] = useState("");
  const [enableToSearch, setEnableToSearch] = useState(false);
  const [enableToContinue, setEnableToContinue] = useState(false);

  const inputRef = React.createRef();

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    };
  }

  const setCurrentBarCodeDetail = (result) => {
    const obj = {
      text: result,
    };
    postBarCodeDetail(obj)
      .then((res) => res.text())
      .then((result) => JSON.parse(result))
      .then((result) => {
        setStatus("finished");
        if (result.status === "success") {
          toastr.success(result.message);
          setEnableToContinue(true);
          handleJurorData(result.jurorData);
        } else if (result.status === "failed") {
          toastr.error(result.message);
          setEnableToSearch(true);
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const saveCurrentBarCodeDetail = () => {
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

  const _onDetected = (result) => {
    const func = () => {
      setTimeout(() => {
        setScanning(true);
        setStatus("scanning...");
        setResults([]);
        setEnableToSearch(false);
      }, 2000);
    };
    setIsTimeOut(false);
    setCurrentBarCodeDetail(result.codeResult.code);
    setResults([result]);
    setScanning(false);
    setStatus("waiting");
    func();
  };

  const onChange = (value) => {
    setCurrentBarCodeDetail(value);
  };

  const debounceOnChange = React.useCallback(debounce(onChange, 10), []);

  if (userIsIdle) {
    history.push("/");
  }

  return (
    <div
      onClick={() => {
        inputRef.current.focus();
      }}
    >
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
                  style={{ color: "#3f51b5", fontSize: "75px" }}
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
          justify="column"
          alignItems="center"
          style={{ height: "80vh" }}
        >
          {scannerMode === "webcam" ? (
            <>
              <Grid item container xs={12} justify="center">
                <Grid item xs={9}>
                  <div>
                    <br />
                    <br />
                    <div className="header">
                      <div>
                        <Typography variant="h6">{status}</Typography>
                      </div>
                      <br />
                      {!scanning ? (
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
                        {results.map((result, i) => (
                          <Result
                            key={result.codeResult.code + i}
                            result={result}
                          />
                        ))}
                      </ul>
                    </div>
                    <div style={{ height: "480px" }}>
                      {scanning ? <Scanner onDetected={_onDetected} /> : null}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </>
          ) : scannerMode === "scanner" ? (
            <Grid item container xs={12} justify="center">
              <Grid item>
                <input
                  autoFocus
                  ref={inputRef}
                  value={scannedResult}
                  onChange={(e) => {
                    debounceOnChange(e.target.value);
                    setScannedResult(e.target.value);
                  }}
                  style={{ opacity: 0 }}
                />
              </Grid>
            </Grid>
          ) : null}
          <Grid item container xs={12} justify="center" spacing="3">
            <Grid item xs={12}>
              <Typography variant="h6" align="center" fullWidth>
                {status === "finished" ? null : status}
              </Typography>
            </Grid>
            {status === "waiting" ? <LoadingCircle size={110} /> : null}
            <Grid item xs={9}>
              {enableToSearch && (
                <Grid container justify="center" direction="column" spacing="5">
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
                        setScannedResult("");
                        setEnableToSearch(false);
                        setStatus("waiting");
                        inputRef.current.focus();
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
                      onClick={() => history.push("/search")}
                      fullWidth
                    >
                      Search By ID
                    </Button>
                  </Grid>
                </Grid>
              )}
              {enableToContinue && (
                <Grid item container xs={12} justify="center" spacing="3">
                  <Grid item xs={12}>
                    <Typography variant="h5" spacing="3">
                      {jurorData.firstName} {jurorData.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5">
                      {jurorData.scheduleTime}
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
                      onClick={() => history.push("/confirm")}
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
};

const mapStateToProps = (state) => {
  const { scanner } = state;
  return { scannerMode: scanner.scannerMode, jurorData: scanner.jurorData };
};

export default connect(mapStateToProps, { handleJurorData })(ScanPage);
