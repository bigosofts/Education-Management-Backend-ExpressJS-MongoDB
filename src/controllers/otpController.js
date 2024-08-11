const otpModel = require("../models/otpModel");

exports.createOTP = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;


  //Make res body for posting to the Database

  let postBody = {
    email: reqBody.email,
    otp: reqBody.otp,
    createdDate: new Date(Date.now()).toISOString(),
    status: reqBody.status,
  };


  // Create Database record
  otpModel
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

// find from the database record
exports.selectOTPS = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  otpModel
    .find(query, projection)
    .sort({ createdDate: -1 })
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
exports.updateOTP = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    email: reqBody.email,
    otp: reqBody.otp,
    status: reqBody.status,
  };

  otpModel
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
exports.deleteOTP = (req, res) => {
  let _id = req.params.id;

  otpModel
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
