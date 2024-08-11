const paymentModel = require("../models/paymentModel");

exports.createPayments = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  //Make res body for posting to the Database

  let postBody = {
    paymentID: reqBody.paymentID,
    paymentCurrency: reqBody.paymentCurrency,
    admissionDate: reqBody.admissionDate,

    admissionPrice: reqBody.admissionPrice,
    monthlyPaymentPrice: reqBody.monthlyPaymentPrice,
    admissionPaymentHistory: reqBody.admissionPaymentHistory,
    monthlyPaymentHistory: reqBody.monthlyPaymentHistory,
    paymentCreatedDate: new Date(Date.now()).toISOString(),
    paymentUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  // Create Database record
  paymentModel
    .create(postBody)
    .then((data) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};

//Read or select Database Record
exports.selectPayments = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  paymentModel
    .find(query, projection)
    .sort({ paymentCreatedDate: -1 })
    .then((data) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};

//Update Database Record
exports.updatePayment = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    paymentID: reqBody.paymentID,
    paymentCurrency: reqBody.paymentCurrency,
    admissionDate: reqBody.admissionDate,

    admissionPrice: reqBody.admissionPrice,
    monthlyPaymentPrice: reqBody.monthlyPaymentPrice,
    admissionPaymentHistory: reqBody.admissionPaymentHistory,
    monthlyPaymentHistory: reqBody.monthlyPaymentHistory,
    paymentUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  paymentModel
    .updateOne({ _id: filter }, { $set: postBody }, { upsert: true })
    .then((data) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};

//Deleting from database
exports.deletePayment = (req, res) => {
  let _id = req.params.id;

  paymentModel
    .deleteOne({ _id: _id })
    .then((data) => {
      res.status(200).json({
        status: "Alhamdulillah",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Innalillah",
        data: err,
      });
    });
};
