import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { BlueCheckbox } from '../../shard/BlueCheckbox';
import Button from '@material-ui/core/Button';

const styles = {
  paper: {
    width: '75%',
    maxWidth: 700,
    padding: 15,
  },
  dialogActions: {
    padding: '8px, 24px',
  },
  cancelBtn: {
    marginLeft: 16,
  },
  panel: {
    border: '1px solid #333',
    borderRadius: 5,
    padding: 15,
  },
  customerHeader: {
    textAlign: 'right',
  },
  headerContent: {
    fontWeight: 600,
  },
  dateContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #ccc',
    padding: 10,
    borderRadius: 5,
  },
};

const useStyles = makeStyles(styles);

const ScannerModal = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose} classes={{ paper: classes.paper }}>
      <DialogTitle>
        <Grid container justify="center">
          <Grid item>Select Scanner Type</Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container justify="space-between" alignItems="center" spacing="2">
          <Grid item xs={1} />
          <Grid item xs={1}>
            <BlueCheckbox />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="left" fullWidth>
              Web Camera
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <BlueCheckbox />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="left" fullWidth>
              Barcode Scanner
            </Typography>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <br />
      </DialogContent>
      <DialogActions>
        <Grid container justify="space-between" spacing="2">
          <Grid item xs={6} />
          <Grid item xs={3}>
            <Button variant="contained" size="large" onClick={() => {}} fullWidth>
              CANCEL
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              // disabled={unableToSave}
              // onClick={handleSave}
              fullWidth
            >
              SAVE
            </Button>
          </Grid>
        </Grid>
        <br />
      </DialogActions>
    </Dialog>
  );
};

export default ScannerModal;
