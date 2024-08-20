const logModel = require("../models/logModel");

exports.createLog = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let user = reqBody.user;
  let message = reqBody.message;
  let date = new Date(Date.now()).toISOString();

  //Make res body for posting to the Database

  let postBody = {
    user: user,
    message: message,
    date: date,
  };

  // Create Database record
  logModel
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
exports.selectLogs = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  logModel
    .find(query, projection)
    .sort({ date: -1 })
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

exports.selectLogsPlus = async (req, res) => {
  let pageNo = Number(req.params.pageNo);
  let perPage = Number(req.params.perPage);
  let searchValue = req.params.searchKey;
  const skipRow = (pageNo - 1) * perPage;
  let Rows;
  let Total;

  if (searchValue !== "0") {
    let SearchRgx = { $regex: String(searchValue), $options: "i" };
    let SearchQuery = {
      $or: [{ user: SearchRgx }, { message: SearchRgx }],
    };

    const result = await logModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await logModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await logModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await logModel.aggregate([{ $skip: skipRow }, { $limit: perPage }]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateLog = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    user: reqBody.user,
    message: reqBody.message,
    date: new Date(Date.now()).toISOString(),
  };

  logModel
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
exports.deleteLog = (req, res) => {
  let _id = req.params.id;

  logModel
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
