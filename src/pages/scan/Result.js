import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class Result extends Component {
  render() {
    const result = this.props.result;

    if (!result) {
      return null;
    }

    return (
      <>
        <br />
        <Typography vairant="h6">Type: {result.codeResult.format}</Typography>
        <br />
        <Typography vairant="h6">Code: {result.codeResult.code} </Typography>
      </>
    );
  }
}

export default Result;
