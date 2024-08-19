const noticeModel = require("../models/noticeModel");

exports.createNotice = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let noticeTitle = reqBody.noticeTitle;
  let noticeCreatedDate = new Date(Date.now()).toISOString();
  let noticeIcon = reqBody.noticeIcon;
  let noticeLink = reqBody.noticeLink;
  let noticeUpdatedDate = new Date(Date.now()).toISOString();
  let noticeId = reqBody.noticeId;
  let activeStatus = reqBody.activeStatus;
  //Make res body for posting to the Database

  let postBody = {
    noticeTitle: noticeTitle,
    noticeCreatedDate: noticeCreatedDate,
    noticeUpdatedDate: noticeUpdatedDate,
    noticeIcon: noticeIcon,
    noticeLink: noticeLink,
    noticeId: noticeId,
    activeStatus: activeStatus,
  };

  // Create Database record
  noticeModel
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
exports.selectNotices = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  noticeModel
    .find(query, projection)
    .sort({ noticeCreatedDate: -1 })
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

exports.selectNoticesPlus = async (req, res) => {
  let pageNo = Number(req.params.pageNo);
  let perPage = Number(req.params.perPage);
  let searchValue = req.params.searchKey;
  const skipRow = (pageNo - 1) * perPage;
  let Rows;
  let Total;

  if (searchValue !== "0") {
    let SearchRgx = { $regex: searchValue, $options: "i" };
    let SearchQuery = {
      $or: [{ noticeId: SearchRgx }, { "noticeTitle.en": SearchRgx }],
    };

    const result = await noticeModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await noticeModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await noticeModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await noticeModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateNotice = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    noticeId: reqBody.noticeId,
    noticeTitle: {
      en: reqBody.noticeTitle.en,
      bn: reqBody.noticeTitle.bn,
    },
    noticeIcon: reqBody.noticeIcon,
    noticeLink: reqBody.noticeLink,
    noticeUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  noticeModel
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
exports.deleteNotice = (req, res) => {
  let _id = req.params.id;

  noticeModel
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
