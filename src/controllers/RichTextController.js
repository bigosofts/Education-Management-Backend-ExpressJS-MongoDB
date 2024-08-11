const RichTextModel = require("../models/RichTextModel");

exports.createRichText = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  //Make res body for posting to the Database

  let postBody = {
    RichTextName: reqBody.RichTextName,
    TextPayload: reqBody.TextPayload,
    activeStatus: reqBody.activeStatus,
  };

  // Create Database record
  RichTextModel.create(postBody)
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
exports.selectRichTexts = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  RichTextModel.find(query, projection)
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
exports.updateRichText = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    RichTextName: reqBody.RichTextName,
    TextPayload: reqBody.TextPayload,
    activeStatus: reqBody.activeStatus,
  };

  RichTextModel.updateOne({ _id: filter }, { $set: postBody }, { upsert: true })
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
exports.deleteRichText = (req, res) => {
  let _id = req.params.id;

  RichTextModel.deleteOne({ _id: _id })
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
