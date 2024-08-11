const donationModel = require("../models/donationModel");

exports.createDonation = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  //Make res body for posting to the Database

  let postBody = {
    donationID: reqBody.donationID,
    donationTargetAmount: reqBody.donationTargetAmount,
    donationArea: reqBody.donationArea,
    donationAmount: reqBody.donationAmount,
    donationPaymentWay: reqBody.donationPaymentWay,
    donationTransactionID: reqBody.donationTransactionID,
    donationSenderAccount: reqBody.donationSenderAccount,
    donationRepeatTime: reqBody.donationRepeatTime,
    nextDonationTime: reqBody.nextDonationTime,
    donationCreatedDate: new Date(Date.now()).toISOString(),
    donationUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  // Create Database record
  donationModel
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
exports.selectDonations = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  workModel
    .find(query, projection)
    .sort({ donationCreatedDate: -1 })
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
exports.updateDonation = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];

  let postBody = {
    donationTargetAmount: reqBody.donationTargetAmount,
    donationArea: reqBody.donationArea,
    donationAmount: reqBody.donationAmount,
    donationPaymentWay: reqBody.donationPaymentWay,
    donationTransactionID: reqBody.donationTransactionID,
    donationSenderAccount: reqBody.donationSenderAccount,
    donationRepeatTime: reqBody.donationRepeatTime,
    nextDonationTime: reqBody.nextDonationTime,

    donationUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  donationModel
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
exports.deleteDonation = (req, res) => {
  let _id = req.params.id;

  donationModel
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
