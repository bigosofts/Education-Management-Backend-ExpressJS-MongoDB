const eventModel = require("../models/eventModel");

exports.createEvent = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let eventTitle = reqBody.eventTitle;
  let eventCreatedDate = new Date(Date.now()).toISOString();
  let eventUpdatedDate = new Date(Date.now()).toISOString();
  let eventUpcomingDate = reqBody.eventUpcomingDate;
  let eventIcon = reqBody.eventIcon;
  let eventLink = reqBody.eventLink;
  let eventImageLink = reqBody.eventImageLink;
  let eventId = reqBody.eventId;
  let activeStatus = reqBody.activeStatus;

  //Make res body for posting to the Database
  let postBody = {
    eventTitle: eventTitle,
    eventCreatedDate: eventCreatedDate,
    eventUpdatedDate: eventUpdatedDate,
    eventUpcomingDate: eventUpcomingDate,
    eventIcon: eventIcon,
    eventLink: eventLink,
    eventId: eventId,
    eventImageLink: eventImageLink,
    activeStatus: activeStatus,
  };

  // Create Database record
  eventModel
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
exports.selectEvents = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  eventModel
    .find(query, projection)
    .sort({ eventCreatedDate: -1 })
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
exports.updateEvent = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    eventId: reqBody.eventId,
    eventTitle: {
      en: reqBody.eventTitle.en,
      bn: reqBody.eventTitle.bn,
    },
    eventUpcomingDate: {
      en: reqBody.eventUpcomingDate.en,
      bn: reqBody.eventUpcomingDate.bn,
    },
    eventUpdatedDate: new Date(Date.now()).toISOString(),
    eventIcon: reqBody.eventIcon,
    eventLink: reqBody.eventLink,
    eventImageLink: reqBody.eventImageLink,
    activeStatus: reqBody.activeStatus,
  };

  eventModel
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
exports.deleteEvent = (req, res) => {
  let _id = req.params.id;

  eventModel
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
