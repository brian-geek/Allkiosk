import Dynamsoft from "../Dynamsoft";
import React from "react";
import BarcodeScanner from "./BarcodeScanner";
import { postBarCodeDetail, saveBarCodeDetail } from "../clients/api";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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

class ScanPage extends React.Component {
  constructor(props) {
    super(props);
    this.reader = null;
    this.refDivMessage = React.createRef();
    this.state = {
      messageKeyBase: 0,
      messages: [],
      currentBarcodeDetail: {},
    };
  }

  componentDidUpdate() {
    this.refDivMessage.current.scrollTop = this.refDivMessage.current.scrollHeight;
  }
  componentWillUnmount() {
    if (this.reader) {
      this.reader.destroy();
    }
  }

  appendMessage = (str) => {
    this.setState((state) => {
      state.messages.push(str);
      if (state.messages.length > 500) {
        ++state.messageKeyBase;
        state.messages.splice(0, 1);
      }
      return state;
    });
  };

  setCurrentBarCodeDetail = (obj) => {
    postBarCodeDetail(obj)
      .then((res) => res.text())
      .then((result) => JSON.parse(result))
      .then((result) => console.error("--------", result));
    this.setState({
      currentBarcodeDetail: obj,
    });
  };

  saveCurrentBarCodeDetail = () => {
    saveBarCodeDetail(this.state.currentBarcodeDetail)
      .then((res) => res.text())
      .then((result) => JSON.parse(result))
      .then((result) => console.error("++++++", result));
  };

  onIptChange = (event) => {
    // React can't get event.target in async func by default.
    // Thus get event.target in sync part.
    let input = event.target;

    (async () => {
      try {
        this.appendMessage("======== start read... ========");
        let reader = (this.reader =
          this.reader || (await Dynamsoft.BarcodeReader.createInstance()));
        let files = input.files;
        for (let i = 0; i < files.length; ++i) {
          let file = files[i];
          this.appendMessage(file.name + ":");
          let results = await reader.decode(file);
          for (let result of results) {
            this.appendMessage(result.barcodeText);
          }
        }
        input.value = "";
        this.appendMessage("======== finish read ========");
      } catch (ex) {
        this.appendMessage(ex.message);
        console.error(ex);
      }
    })();
  };

  render() {
    return (
      <div>
        <Grid
          container
          xs={12}
          spacing="2"
          justify="space-between"
          alignItems="stretch"
        >
          <Grid container item xs={3} justify="column">
            <Grid item xs={12}>
              <img
                src="https://www.tempe.gov/Home/ShowPublishedImage/51838/636936793486770000"
                alt="Court Logo"
                style={styles.logo}
                onClick={() => this.props.history.push("/")}
              />
            </Grid>
          </Grid>
          <Grid container item xs={9} justify="center">
            <Grid item xs={9}>
              <div>
                <br />
                <div>
                  Choose image(s) to decode:
                  <input
                    onChange={this.onIptChange}
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,image/bmp,image/gif"
                  />
                  <br />
                  <br />
                </div>
                <div>
                  <BarcodeScanner
                    appendMessage={this.appendMessage}
                    setCurrentBarCodeDetail={this.setCurrentBarCodeDetail}
                  />
                  <button onClick={this.saveCurrentBarCodeDetail}>
                    Save Current BarCode Info
                  </button>
                </div>

                <div
                  className="div-message"
                  style={styles.div_message}
                  ref={this.refDivMessage}
                >
                  {this.state.messages.map((message, index) => (
                    <p key={this.state.messageKeyBase + index}>{message}</p>
                  ))}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ScanPage;
