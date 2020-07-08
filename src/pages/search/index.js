import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ReplyIcon from '@material-ui/icons/Reply';
import IconButton from '@material-ui/core/IconButton';
import OutlinedTextField from '../../components/CustomTextField';

import { toastr } from 'react-redux-toastr';
import { postJurorDetail } from '../../clients/api';
import { handleJurorData } from '../../redux/actions/scannerActions';

const styles = {
  logo: {
    width: '280px',
    marginTop: '50px',
    cursor: 'pointer',
  },
  btn: {
    fontSize: '18px',
    borderRadius: '50px',
  },
  sidePanel: {
    height: '100vh',
    margin: 'auto',
  },
  textField: {
    fontWeight: 500,
    fontSize: 21,
  },
  backbtn: {
    color: '#3f51b5',
    fontSize: '75px',
  },
  form: {
    margin: 'auto',
  },
};

const useStyles = makeStyles(styles);

const Search = ({ history, userIsIdle, handleJurorData, jurorData }) => {
  const classes = useStyles();
  const [status, setStatus] = useState('init');
  const initialSearchInfo = {
    firstName: '',
    lastName: '',
    birthDate: '',
    middleName: '',
  };
  const [searchInfo, setSearchInfo] = useState(initialSearchInfo);
  const [unableToSearch, setUnableToSearch] = useState(true);
  const handleSearch = () => {
    postJurorDetail(searchInfo)
      .then(res => res.text())
      .then(result => JSON.parse(result))
      .then(result => {
        if (result.status === 'success') {
          toastr.success(result.message);
          // handleJurorData(result.jurorData);
          // setSearchInfo(initialSearchInfo);
          // setStatus(result.status);
        } else if (result.status === 'failed') {
          toastr.error(result.message);
          // setSearchInfo(initialSearchInfo);
          // setStatus(result.status);
        }
      })
      .catch(err => toastr.error(err.message));
  };

  useEffect(() => {
    if (
      searchInfo.firstName &&
      searchInfo.lastName &&
      searchInfo.birthDate &&
      searchInfo.middleName
    ) {
      setUnableToSearch(false);
    } else {
      setUnableToSearch(true);
    }
  }, [searchInfo]);

  if (userIsIdle) {
    history.push('/');
    localStorage.removeItem('allkiosk_token');
  }

  return (
    <>
      <Grid container xs={12} spacing="2" justify="space-between" alignItems="stretch">
        <Grid container item xs={3} justify="column" className={classes.sidePanel}>
          <Grid item xs={12}>
            <img
              src="https://www.tempe.gov/Home/ShowPublishedImage/51838/636936793486770000"
              alt="Court Logo"
              className={classes.logo}
              onClick={() => {
                history.push('/');
                handleJurorData({});
              }}
            />
          </Grid>
          <Grid container justify="center" alignItems="flex-end" item xs={12}>
            <Grid item>
              <IconButton
                onClick={() => {
                  history.push('/scan');
                  handleJurorData({});
                }}
              >
                <ReplyIcon className={classes.backbtn} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={9} alignItems="center" className={classes.form}>
          {status === 'init' ? (
            <Grid item container xs={12} justify="center" spacing="5">
              <Grid item xs={9}>
                <OutlinedTextField
                  type="text"
                  label="First Name"
                  value={searchInfo.firstName}
                  onChange={value =>
                    setSearchInfo({
                      ...searchInfo,
                      firstName: value === '' ? null : value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={9}>
                <OutlinedTextField
                  label="Middle Name"
                  type="text"
                  value={searchInfo.middleName}
                  onChange={value =>
                    setSearchInfo({
                      ...searchInfo,
                      middleName: value === '' ? null : value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={9}>
                <OutlinedTextField
                  label="Last Name"
                  type="text"
                  value={searchInfo.lastName}
                  onChange={value =>
                    setSearchInfo({
                      ...searchInfo,
                      lastName: value === '' ? null : value,
                    })
                  }
                />
              </Grid>
              <Grid container item xs={9}>
                <Typography align="left">Date of Birth</Typography>
                <OutlinedTextField
                  variant="outlined"
                  type="date"
                  value={searchInfo.birthDate}
                  onChange={value =>
                    setSearchInfo({
                      ...searchInfo,
                      birthDate: value === '' ? null : value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={9}>
                <br />
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  className={classes.btn}
                  disabled={unableToSearch}
                  onClick={handleSearch}
                  fullWidth
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          ) : status === 'success' ? (
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
                  onClick={() => history.push('/confirm')}
                  fullWidth
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          ) : status === 'failed' ? (
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
                  onClick={() => history.push('/main')}
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

const mapStateToProps = state => {
  const { scanner } = state;
  return { jurorData: scanner.jurorData };
};

export default connect(mapStateToProps, { handleJurorData })(Search);
