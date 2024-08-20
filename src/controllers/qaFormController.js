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

exports.selectQAFormPlus = async (req, res) => {
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
        { qaformid: SearchRgx },
        { questiontext: SearchRgx },
        { correctanswer: SearchRgx },
        { activeStatus: SearchRgx },
      ],
    };

    const result = await qaFormModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await qaFormModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await qaFormModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await qaFormModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
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
