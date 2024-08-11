const pushNoticeModel = require("../models/pushNoticeModel");

exports.createPushNotice = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  let subject = reqBody.subject;
  let text = reqBody.text;
  let reciever = reqBody.reciever;
  let sender = reqBody.sender;
  let link = reqBody.link;
  let readStatus = reqBody.readStatus;
  let createdDate = new Date(Date.now()).toISOString();
  let activeStatus = reqBody.activeStatus;

  //Make res body for posting to the Database

  let postBody = {
    subject,
    text,
    reciever,
    sender,
    link,
    readStatus,
    createdDate,
    activeStatus,
  };

  // Create Database record
  pushNoticeModel
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
exports.selectPushNotices = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  pushNoticeModel
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
exports.updatePushNotice = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    subject: reqBody.subject,
    text: reqBody.text,
    reciever: reqBody.reciever,
    sender: reqBody.sender,
    link: reqBody.link,
    readStatus: reqBody.readStatus,
    activeStatus: reqBody.activeStatus,
  };

  pushNoticeModel
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
exports.deletePushNotice = (req, res) => {
  let _id = req.params.id;

  pushNoticeModel
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
