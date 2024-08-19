const pushNoticeModel = require("../models/pushNoticeModel");

exports.createPushNotice = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  let subject = reqBody.subject;
  let text = reqBody.text;
  let reciever = reqBody.reciever;
  let sender = reqBody.sender;
  let link = reqBody.link;
  let readStatus = reqBody.readStatus;
  let createdDate = new Date(Date.now()).toISOString();
  let activeStatus = reqBody.activeStatus;

  //Make res body for posting to the Database

  let postBody = {
    subject,
    text,
    reciever,
    sender,
    link,
    readStatus,
    createdDate,
    activeStatus,
  };

  // Create Database record
  pushNoticeModel
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
exports.selectPushNotices = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  pushNoticeModel
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

exports.selectPushNoticesPlus = async (req, res) => {
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
        { reciever: SearchRgx },
        { sender: SearchRgx },
        { activeStatus: SearchRgx },
        { "subject.en": SearchRgx },
        { "text.en": SearchRgx },
      ],
    };

    const result = await pushNoticeModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await pushNoticeModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await pushNoticeModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await pushNoticeModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updatePushNotice = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    subject: reqBody.subject,
    text: reqBody.text,
    reciever: reqBody.reciever,
    sender: reqBody.sender,
    link: reqBody.link,
    readStatus: reqBody.readStatus,
    activeStatus: reqBody.activeStatus,
  };

  pushNoticeModel
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
exports.deletePushNotice = (req, res) => {
  let _id = req.params.id;

  pushNoticeModel
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
