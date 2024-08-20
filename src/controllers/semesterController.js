const semesterModel = require("../models/semesterModel");

exports.createSemester = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  //Make res body for posting to the Database

  let postBody = {
    semesterID: reqBody.semesterID,
    semesterName: reqBody.semesterName,
    semesterBooks: reqBody.semesterBooks,
    semesterCreatedDate: new Date(Date.now()).toISOString(),
    semesterUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  // Create Database record
  semesterModel
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
exports.selectSemesters = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  semesterModel
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

exports.selectSemestersPlus = async (req, res) => {
  let pageNo = Number(req.params.pageNo);
  let perPage = Number(req.params.perPage);
  let searchValue = req.params.searchKey;
  const skipRow = (pageNo - 1) * perPage;
  let Rows;
  let Total;

  if (searchValue !== "0") {
    let SearchRgx = { $regex: String(searchValue), $options: "i" };
    let SearchQuery = {
      $or: [
        { semesterID: SearchRgx },
        { semesterName: SearchRgx },
        { activeStatus: SearchRgx },
      ],
    };

    const result = await semesterModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await semesterModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await semesterModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await semesterModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateSemester = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    semesterID: reqBody.semesterID,
    semesterName: reqBody.semesterName,
    semesterBooks: reqBody.semesterBooks,
    semesterUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  semesterModel
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
exports.deleteSemester = (req, res) => {
  let _id = req.params.id;

  semesterModel
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
