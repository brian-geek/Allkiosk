import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const muiStyles = theme => ({
  textField: {
    fontWeight: 500,
    fontSize: 21,
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
    },
  },
});

const OutlinedTextField = ({
  classes,
  type,
  label,
  required,
  value,
  onChange,
  disabled,
  inputProps,
  isValid,
  errorText,
  endAdornment,
  startAdornment,
  fontSize,
  autoFocus,
  inputRef,
  placeholder,
}) => (
  <React.Fragment>
    <Typography style={{ fontSize: fontSize }} align="left">
      {required ? `${label} *` : label}
    </Typography>
    <TextField
      autoFocus={autoFocus}
      required={required}
      inputRef={inputRef}
      type={type === 'date' ? 'date' : 'text'}
      value={type === 'number' ? String(value) : value}
      onChange={({ target: { value } }) => {
        if (type === 'number') {
          onChange(parseFloat(value === '' ? '0' : value));
        } else {
          onChange(value);
        }
      }}
      InputProps={{
        className: classes.textField,
        startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
        endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
      }}
      variant="outlined"
      fullWidth
      disabled={disabled}
      inputProps={inputProps}
      error={!isValid}
      helperText={isValid ? null : errorText}
      onKeyPress={ev => {
        if (ev.key === 'e' && type === 'number') {
          ev.preventDefault();
        }
      }}
      placeholder={placeholder}
    >
      {value}
    </TextField>
  </React.Fragment>
);

OutlinedTextField.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  isValid: PropTypes.bool,
  inputProps: PropTypes.object,
  errorText: PropTypes.string,
  endAdornment: PropTypes.string,
  startAdornment: PropTypes.string,
  fontSize: PropTypes.number,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
};

OutlinedTextField.defaultProps = {
  required: false,
  type: 'text',
  value: undefined,
  disabled: false,
  inputProps: {},
  isValid: true,
  errorText: '',
  endAdornment: '',
  startAdornment: '',
};

export default withStyles(muiStyles)(OutlinedTextField);
