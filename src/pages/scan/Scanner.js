import React, { Component } from 'react';
import Quagga from 'quagga';
import './BarcodeScanner.css';

class Scanner extends Component {
  componentDidMount() {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment', // or user
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: 4,
        decoder: {
          readers: ['ean_reader'],
        },
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true,
        },
        multiple: false,
        locate: true,
        debug: true,
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(this._onDetected);
  }

  componentWillUnmount() {
    Quagga.offDetected(this._onDetected);
  }

  _onDetected = result => {
    this.props.onDetected(result);
  };

  render() {
    return (
      <>
        <div id="interactive" className="viewport" style={{ height: '100%', width: '100%' }}></div>
        <div
          style={{
            // display: "none",
            width: '35%',
            height: '1%',
            position: 'absolute',
            animation: '3s infinite dbrScanner-scanlight',
            borderRadius: '50%',
            boxShadow: '0px 0px 2vw 1px #00e5ff',
            background: '#fff',
            marginLeft: '10%',
          }}
        ></div>
      </>
    );
  }
}

export default Scanner;
