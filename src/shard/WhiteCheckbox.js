import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";

export const WhiteCheckbox = withStyles({
  root: {
    color: "#fff",
    "&$checked": {
      color: "#52af77",
    },
  },
})((props) => <Checkbox color="default" {...props} />);
