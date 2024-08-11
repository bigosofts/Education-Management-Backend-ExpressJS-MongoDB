const workModel = require("../models/workModel");

exports.createWork = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  let sid = reqBody.sid;
  let name = reqBody.name;
  let img = reqBody.img;
  let jamat = reqBody.jamat;
  let createdDate = new Date(Date.now()).toISOString();
  let updateDate = new Date(Date.now()).toISOString();
  let activeStatus = reqBody.activeStatus;

  //Make res body for posting to the Database

  let postBody = {
    sid,
    name,
    img,
    jamat,
    createdDate,
    updateDate,
    activeStatus,
  };

  // Create Database record
  workModel
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
exports.selectWorks = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  workModel
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
exports.updateWorks = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];

  let sid = reqBody.sid;
  let name = reqBody.name;
  let img = reqBody.img;
  let jamat = reqBody.jamat;

  let updateDate = new Date(Date.now()).toISOString();
  let activeStatus = reqBody.activeStatus;

  let postBody = {
    sid,
    name,
    img,
    jamat,
    updateDate,
    activeStatus,
  };

  workModel
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
exports.deleteWork = (req, res) => {
  let _id = req.params.id;

  workModel
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
