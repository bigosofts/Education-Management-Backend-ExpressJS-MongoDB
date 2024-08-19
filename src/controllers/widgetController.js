const widgetModel = require("../models/widgetModel");

exports.createWidget = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let widgetName = reqBody.widgetName;
  let widgetPayload = reqBody.widgetPayload;
  let activeStatus = reqBody.activeStatus;

  //Make res body for posting to the Database

  let postBody = {
    widgetName: widgetName,
    widgetPayload: widgetPayload,
    activeStatus: activeStatus,
  };

  // Create Database record
  widgetModel
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
exports.selectWidgets = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  widgetModel
    .find(query, projection)
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

exports.selectWidgetsPlus = async (req, res) => {
  let pageNo = Number(req.params.pageNo);
  let perPage = Number(req.params.perPage);
  let searchValue = req.params.searchKey;
  const skipRow = (pageNo - 1) * perPage;
  let Rows;
  let Total;

  if (searchValue !== "0") {
    let SearchRgx = { $regex: searchValue, $options: "i" };
    let SearchQuery = {
      $or: [{ widgetName: SearchRgx }, { activeStatus: SearchRgx }],
    };

    const result = await widgetModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await widgetModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await widgetModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await widgetModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateWidget = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    widgetName: reqBody.widgetName,
    widgetPayload: reqBody.widgetPayload,
    activeStatus: reqBody.activeStatus,
  };

  widgetModel
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
exports.deleteWidget = (req, res) => {
  let _id = req.params.id;

  widgetModel
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
