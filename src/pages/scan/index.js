import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Scanner from './Scanner';
import Result from './Result';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { toastr } from 'react-redux-toastr';
import OutlinedTextField from '../../components/CustomTextField';
import { Typography } from '@material-ui/core';
import { postBarCodeDetail, saveBarCodeDetail } from '../../clients/api';
import { handleJurorData } from '../../redux/actions/scannerActions';

import LoadingCircle from '../../shard/LoadingCircle';
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';

const muiStyles = theme => ({
  logo: {
    width: '280px',
    marginTop: '50px',
    cursor: 'pointer',
  },
  // btn: {
  //   height: '125px',
  //   backgroundColor: '#3f51b5',
  //   color: '#fff',
  //   fontSize: '35px',
  //   borderRadius: '25px',
  // },
  div_message: {
    maxHeight: '200px',
    overflowY: 'auto',
    resize: 'both',
  },
  backIcon: { color: '#3f51b5', fontSize: '75px' },
  sidePanel: {
    height: '100vh',
    margin: 'auto',
  },
  mainPanel: {
    margin: 'auto',
  },
  btn: {
    fontSize: '18px',
    borderRadius: '50px',
  },
});

const ScanPage = props => {
  const {
    scannerMode,
    jurorData,
    handleJurorData,
    userIsIdle,
    setIsTimeOut,
    history,
    classes,
  } = props;
  const [scanning, setScanning] = useState(true);
  const [status, setStatus] = useState('waiting');
  const [results, setResults] = useState([]);
  const [scannedResult, setScannedResult] = useState('');
  const [enableToSearch, setEnableToSearch] = useState(false);
  const [enableToContinue, setEnableToContinue] = useState(false);

  const [unableToContinue, setUnableToContinue] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

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

  // const setCurrentBarCodeDetail = result => {
  //   const obj = {
  //     text: result,
  //   };
  //   postBarCodeDetail(obj)
  //     .then(res => res.text())
  //     .then(result => JSON.parse(result))
  //     .then(result => {
  //       setStatus('finished');
  //       if (result.status === 'success') {
  //         toastr.success(result.message);
  //         setEnableToContinue(true);
  //         setEnableToSearch(false);
  //         handleJurorData(result.jurorData);
  //       } else if (result.status === 'failed') {
  //         toastr.error(result.message);
  //         setEnableToSearch(true);
  //         setEnableToContinue(false);
  //       }
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  // };

  const saveCurrentBarCodeDetail = () => {
    const obj = {
      text: results[0].codeResult.code,
    };
    saveBarCodeDetail(obj)
      .then(res => res.text())
      .then(result => JSON.parse(result))
      .then(result => {
        if (result.status === 'success') {
          toastr.success(result.message);
        } else if (result.status === 'failed') {
          toastr.error(result.message);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  const _onDetected = result => {
    const func = () => {
      setTimeout(() => {
        setScanning(true);
        setStatus('scanning...');
        setResults([]);
        setEnableToSearch(false);
      }, 2000);
    };
    setIsTimeOut(false);
    // setCurrentBarCodeDetail(result.codeResult.code);
    setResults([result]);
    setScanning(false);
    setStatus('waiting');
    func();
  };

  // const onChange = value => {
  //   setCurrentBarCodeDetail(value);
  // };

  // const debounceOnChange = React.useCallback(debounce(onChange, 10), []);

  const submitBarcode = () => {
    setIsScanning(true);
    setUnableToContinue(true);
    const obj = {
      text: scannedResult,
    };
    postBarCodeDetail(obj)
      .then(res => res.text())
      .then(result => JSON.parse(result))
      .then(result => {
        setStatus('finished');
        if (result.status === 'success') {
          toastr.success(result.message);
          setScannedResult('');
          setIsScanning(false);
        } else if (result.status === 'failed') {
          toastr.error(result.message);
          setScannedResult('');
          setIsScanning(false);
        }
      })
      .catch(err => {
        throw err;
      });
  };

  useEffect(() => {
    if (scannedResult === '') {
      setUnableToContinue(true);
    } else {
      setUnableToContinue(false);
    }
  }, [scannedResult]);

  if (userIsIdle) {
    history.push('/');
    localStorage.removeItem('allkiosk_token');
  }

  return (
    <div
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <Grid container xs={12} spacing="2" justify="space-between" alignItems="stretch">
        <Grid container item xs={3} justify="column" className={classes.sidePanel}>
          <Grid item xs={12}>
            <img
              src="https://www.tempe.gov/Home/ShowPublishedImage/51838/636936793486770000"
              alt="Court Logo"
              className={classes.logo}
              onClick={() => {
                handleJurorData({});
                history.push('/');
              }}
            />
          </Grid>
          <Grid container justify="center" alignItems="flex-end" item xs={12}>
            <Grid item>
              <IconButton>
                <ReplyIcon
                  className={classes.backIcon}
                  onClick={() => {
                    handleJurorData({});
                    history.push('/');
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={9} alignItems="center" className={classes.mainPanel}>
          {scannerMode === 'webcam' ? (
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
                          onClick={saveCurrentBarCodeDetail}
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
                          <Result key={result.codeResult.code + i} result={result} />
                        ))}
                      </ul>
                    </div>
                    <div style={{ height: '480px' }}>
                      {scanning ? <Scanner onDetected={_onDetected} /> : null}
                    </div>
                  </div>
                </Grid>
              </Grid>
            </>
          ) : scannerMode === 'scanner' ? (
            <Grid item container xs={12} justify="center">
              <Grid item xs={8}>
                <OutlinedTextField
                  autoFocus
                  inputRef={inputRef}
                  value={scannedResult}
                  onChange={value => {
                    // debounceOnChange(e.target.value);
                    setScannedResult(value);
                  }}
                  placeholder="Scan Barcode here or enter manually."
                />
              </Grid>
              <Grid item container>
                <br />
                <br />
                <br />
              </Grid>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.btn}
                  onClick={submitBarcode}
                  disabled={unableToContinue}
                  fullWidth
                >
                  {isScanning ? (
                    <LoadingCircle size={20} />
                  ) : (
                    <Typography variant="h6" align="center" fullWidth>
                      Submit Barcode
                    </Typography>
                  )}
                </Button>
              </Grid>

              <Grid item container>
                <br />
                <br />
                <br />
              </Grid>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.btn}
                  onClick={() => history.push('/search')}
                  fullWidth
                >
                  Verify With Juror Information
                </Button>
              </Grid>
            </Grid>
          ) : null}
          <Grid item container xs={12} justify="center" spacing="3">
            {/* {scannerMode === 'scanner' ? (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" align="center" fullWidth>
                    {status === 'finished' ? null : status}
                  </Typography>
                </Grid>
                {status === 'waiting' ? <LoadingCircle size={110} /> : null}
              </>
            ) : scannerMode === 'webcam' ? null : null} */}
            <Grid item xs={9}>
              {enableToSearch && (
                <Grid container justify="center" direction="column" spacing="5">
                  <Grid item>
                    <Button
                      variant="contained"
                      size="large"
                      style={{
                        backgroundColor: '#3f51b5',
                        color: '#fff',
                        fontSize: '25px',
                        borderRadius: '50px',
                      }}
                      onClick={() => {
                        setScannedResult('');
                        setEnableToSearch(false);
                        setStatus('waiting');
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
                        backgroundColor: '#3f51b5',
                        color: '#fff',
                        fontSize: '25px',
                        borderRadius: '50px',
                      }}
                      onClick={() => history.push('/search')}
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
                    <Typography variant="h5">{jurorData.scheduleTime}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="large"
                      style={{
                        backgroundColor: '#3f51b5',
                        color: '#fff',
                        fontSize: '25px',
                        borderRadius: '50px',
                      }}
                      onClick={() => history.push('/confirm')}
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

const mapStateToProps = state => {
  const { scanner } = state;
  return {
    scannerMode: scanner.scannerMode,
    jurorData: scanner.jurorData,
    scanner: scanner,
  };
};

export default compose(
  connect(mapStateToProps, { handleJurorData }),
  withStyles(muiStyles)
)(ScanPage);
