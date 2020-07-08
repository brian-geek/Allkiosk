import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export const BlueCheckbox = withStyles({
  root: {
    color: '#3f51b5',
    '&$checked': {
      color: '#52af77',
    },
  },
})(props => <Checkbox color="default" {...props} />);
