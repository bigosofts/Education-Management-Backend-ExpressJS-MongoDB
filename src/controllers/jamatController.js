const jamatModel = require("../models/jamatModel");

exports.createJamat = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  //Make res body for posting to the Database

  let postBody = {
    jamatID: reqBody.jamatID,
    jamatName: reqBody.jamatName,
    semesters: reqBody.semesters,
    jamatCreatedDate: new Date(Date.now()).toISOString(),
    jamatUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  // Create Database record
  jamatModel
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
exports.selectJamats = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  jamatModel
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

exports.selectJamatsPlus = async (req, res) => {
  let pageNo = Number(req.params.pageNo);
  let perPage = Number(req.params.perPage);
  let searchValue = req.params.searchKey;
  const skipRow = (pageNo - 1) * perPage;
  let Rows;
  let Total;

  if (searchValue !== "0") {
    let SearchRgx = { $regex: searchValue, $options: "i" };
    let SearchQuery = {
      $or: [
        { jamatID: SearchRgx },
        { jamatName: SearchRgx },
        { activeStatus: SearchRgx },
      ],
    };

    const result = await jamatModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await jamatModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await jamatModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await jamatModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateJamat = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    jamatID: reqBody.jamatID,
    jamatName: reqBody.jamatName,
    semesters: reqBody.semesters,
    jamatUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  jamatModel
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
exports.deleteJamat = (req, res) => {
  let _id = req.params.id;

  jamatModel
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
