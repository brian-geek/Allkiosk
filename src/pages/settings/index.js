import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import ForwardIcon from '@material-ui/icons/Forward';
import IconButton from '@material-ui/core/IconButton';
import ReplyIcon from '@material-ui/icons/Reply';

import { connect } from 'react-redux';
import ScannerModal from './scannerModal';
import { setSettingsInfo } from '../../clients/api';
import { PrettoSlider } from '../../shard/PrettoSlider';

const styles = {
  logo: {
    width: '280px',
    marginTop: '50px',
    cursor: 'pointer',
  },
  layout: {
    width: '100%',
    backgroundColor: '#3f51b5',
    opacity: 0.9,
  },
  headerText: {
    color: '#fff',
    fontSize: '35px',
    fontWeight: 500,
  },
  contentText: {
    color: '#fff',
    fontWeight: 500,
    fontSize: '18px',
  },
  settingsText: {
    color: '#fff',
    fontWeight: 500,
    fontSize: '21px',
  },
  forwardIcon: {
    color: '#fff',
    fontSize: '28px',
  },
  sliderText: {
    color: '#fff',
  },
  sidePanel: {
    height: '100vh',
    margin: 'auto',
  },
  mainPanel: {
    margin: 'auto',
  },
  backbtn: {
    color: '#3f51b5',
    fontSize: '75px',
  },
};

const useStyles = makeStyles(styles);

const Settings = ({ history, userIsIdle, settingsInfo }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [settingsData, setSettingsData] = useState({});
  const [resetTime, setResetTime] = useState();
  const [idleTime, setIdleTime] = useState();

  const formatIdleTime = idleTime => {
    const idleMin = idleTime - (idleTime % 1);
    const idleSec = (idleTime % 1) * 60;
    if (idleSec === 0) {
      return `${idleTime} min`;
    } else {
      if (idleMin === 0) {
        return `${idleSec.toFixed(0)} sec`;
      } else {
        return `${idleMin} min ${idleSec.toFixed(0)} sec`;
      }
    }
  };

  const SubmitSettings = () => {
    history.push('/');
  };

  if (userIsIdle) {
    history.push('/');
    localStorage.removeItem('allkiosk_token');
  }

  useEffect(() => {
    setSettingsData(settingsInfo);
    setResetTime((settingsInfo.resetTime - 5) * 4);
    setIdleTime(((settingsInfo.idleTime - 0.5) * 100) / 4.5);
  }, [settingsInfo]);

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
              }}
            />
          </Grid>
          <Grid container justify="center" alignItems="flex-end" item xs={12}>
            <Grid item>
              <IconButton
                onClick={() => {
                  history.push('/scan');
                }}
              >
                <ReplyIcon className={classes.backbtn} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={9} className={classes.mainPanel}>
          <div className={classes.layout}>
            <Grid container item xs={12} alignItems="center" spacing="10">
              <Grid item container xs={12} justify="center">
                <Grid item container xs={12} justify="center">
                  <Grid item>
                    <br />
                    <br />
                    <br />
                    <Typography className={classes.headerText}>SETTINGS</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item container xs={12} alignItems="center" spacing="8">
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="flex-start"
                  spacing="2"
                >
                  <Grid item xs={2} />
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Idle Timer
                    </Typography>
                  </Grid>
                  <Grid item container xs={7} justify="space-between">
                    <Grid item container xs={12} alignItems="center" spacing="2">
                      <Grid item xs={4}>
                        <Typography align="center" className={classes.sliderText}>
                          {formatIdleTime(settingsData.idleTime)}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <PrettoSlider
                          onChange={(e, newValue) => {
                            setIdleTime(newValue);
                            setSettingsData({
                              ...settingsData,
                              idleTime: (0.5 + (4.5 * newValue) / 100).toFixed(2),
                            });
                          }}
                          value={Number(idleTime)}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} alignItems="center" spacing="2">
                      <Grid item xs={2} />
                      <Grid item xs={4}>
                        <Typography className={classes.sliderText}>30 s</Typography>
                      </Grid>
                      <Grid item xs={4} />
                      <Grid item container justify="flex-end" xs={2}>
                        <Grid>
                          <Typography className={classes.sliderText}>5 min</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justify="space-between"
                  alignItems="flex-start"
                  spacing="2"
                >
                  <Grid item xs={2} />
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Reset Timer
                    </Typography>
                  </Grid>
                  <Grid item container xs={7} justify="space-between">
                    <Grid item container xs={12} alignItems="center" spacing="2">
                      <Grid item xs={4}>
                        <Typography align="center" className={classes.sliderText}>
                          {`${settingsData.resetTime} s`}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <PrettoSlider
                          onChange={(e, newValue) => {
                            setResetTime(newValue);
                            setSettingsData({
                              ...settingsData,
                              resetTime: 5 + (25 * newValue) / 100,
                            });
                          }}
                          value={Number(resetTime)}
                          aria-labelledby="input-slider"
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} alignItems="center" spacing="2">
                      <Grid item xs={2} />
                      <Grid item xs={4}>
                        <Typography className={classes.sliderText}>5 s</Typography>
                      </Grid>
                      <Grid item xs={4} />
                      <Grid item container justify="flex-end" xs={2}>
                        <Grid>
                          <Typography className={classes.sliderText}>30 s</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
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
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Display Wake Settings
                    </Typography>
                  </Grid>
                  <Grid item xs={7} container justify="flex-end">
                    <IconButton>
                      <ForwardIcon
                        className={classes.forwardIcon}
                        onClick={() => history.push('/display_settings')}
                      />
                    </IconButton>
                  </Grid>
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
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Camera
                    </Typography>
                  </Grid>
                  <Grid item xs={7} container justify="flex-end" alignItems="center">
                    <Grid item>
                      <Typography className={classes.contentText} align="left">
                        Surface Go
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton onClick={() => setOpen(true)}>
                        <EditIcon className={classes.settingsText} />
                      </IconButton>
                    </Grid>
                  </Grid>
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
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Printer
                    </Typography>
                  </Grid>
                  <Grid item xs={7} container justify="flex-end" alignItems="center">
                    <Grid item>
                      <Typography className={classes.contentText} align="left">
                        Oki B4600
                      </Typography>
                    </Grid>
                    <Grid item>
                      <IconButton>
                        <EditIcon className={classes.settingsText} />
                      </IconButton>
                    </Grid>
                  </Grid>
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
                  <Grid item xs={3}>
                    <Typography className={classes.settingsText} align="left">
                      Go to Windows Admin
                    </Typography>
                  </Grid>
                  <Grid item xs={7} container justify="flex-end">
                    <IconButton>
                      <ForwardIcon className={classes.forwardIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <ScannerModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

const mapStateToProps = state => {
  const { scanner } = state;
  return { settingsInfo: Object.assign({}, scanner) };
};

export default connect(mapStateToProps, null)(Settings);
