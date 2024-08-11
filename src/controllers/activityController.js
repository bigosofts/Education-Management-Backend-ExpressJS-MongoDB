const activityModel = require("../models/activityModel");

exports.createActivity = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let activityImageLink = reqBody.activityImageLink;
  let activityTitle = reqBody.activityTitle;
  let activityDescription = reqBody.activityDescription;
  let activityCreatedDate = new Date(Date.now()).toISOString();
  let activityUpdatedDate = new Date(Date.now()).toISOString();
  let activityIcon = reqBody.activityIcon;
  let activityId = reqBody.activityId;
  let activeStatus = reqBody.activeStatus;

  //Make res body for posting to the Database

  let postBody = {
    activityImageLink: activityImageLink,
    activityTitle: activityTitle,
    activityDescription: activityDescription,
    activityCreatedDate: activityCreatedDate,
    activityUpdatedDate: activityUpdatedDate,
    activityIcon: activityIcon,
    activityId: activityId,
    activeStatus: activeStatus,
  };

  // Create Database record
  activityModel
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
exports.selectActivities = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  activityModel
    .find(query, projection)
    .sort({ activityCreatedDate: -1 })
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
exports.updateActivity = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    activityId: reqBody.activityId,
    activityImageLink: reqBody.activityImageLink,
    activityTitle: {
      en: reqBody.activityTitle.en,
      bn: reqBody.activityTitle.bn,
    },
    activityDescription: {
      en: reqBody.activityDescription.en,
      bn: reqBody.activityDescription.bn,
    },
    activityUpdatedDate: new Date(Date.now()).toISOString(),
    activityIcon: reqBody.activityIcon,
    activeStatus: reqBody.activeStatus,
  };

  activityModel
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
exports.deleteActivity = (req, res) => {
  let _id = req.params.id;

  activityModel
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
