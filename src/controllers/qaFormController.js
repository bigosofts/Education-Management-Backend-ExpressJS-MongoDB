const qaFormModel = require("../models/QAFormModel");

exports.createQAForm = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  //Make res body for posting to the Database

  let postBody = {
    qaformid: reqBody.qaformid,
    questionimage: reqBody.questionimage,
    questiontext: reqBody.questiontext,
    multiplechoice: reqBody.multiplechoice,
    correctanswer: reqBody.correctanswer,
    createdDate: new Date(Date.now()).toISOString(),
    updatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  // Create Database record
  qaFormModel
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
exports.selectQAForm = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  qaFormModel
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
exports.updateQAForm = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    qaformid: reqBody.qaformid,
    questionimage: reqBody.questionimage,
    questiontext: reqBody.questiontext,
    multiplechoice: reqBody.multiplechoice,
    correctanswer: reqBody.correctanswer,
    updatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  qaFormModel
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
exports.deleteQAForm = (req, res) => {
  let _id = req.params.id;

  qaFormModel
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
