import ENDPOINT from '../utils/constants';

export const GetQrData = (amount, qrData) => {
  if (amount) {
    var request = require('request');
    var options = {
      method: 'POST',
      url: ENDPOINT.GET_QR_SALE,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-ibm-client-secret': process.env.X_IBM_CLIENT_SECRET,
        'x-ibm-client-id': process.env.X_IBM_CLIENT_ID,
      },
      body: {
        totalReceiptAmount: amount,
      },
      json: true,
    };

    request(options, function(error, response, body) {
      if (error) {
        console.error('Failed: %s', error.message);
        qrData(null);
      }
      qrData(body.QRdata);
    });
  } else {
    qrData(null);
  }
};

export const CompletePayment = (data, paymentResult) => {
  if (data) {
    var request = require('request');
    var options = {
      method: 'POST',
      url: ENDPOINT.PAYMENT,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-ibm-client-secret': process.env.X_IBM_CLIENT_SECRET,
        'x-ibm-client-id': process.env.X_IBM_CLIENT_ID,
      },
      body: data,
      json: true,
    };

    request(options, function(error, response, body) {
      if (error) {
        console.error('Failed: %s', error.message);
        paymentResult(null);
      }
      if (body.returnCode === 1000) {
        paymentResult(body);
      } else {
        paymentResult(null);
      }
    });
  } else {
    paymentResult(null);
  }
};
