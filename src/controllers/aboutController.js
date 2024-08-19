const aboutModel = require("../models/aboutModel");

exports.createAbout = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let aboutImageLink = reqBody.aboutImageLink;
  let aboutTitle = reqBody.aboutTitle;
  let aboutDescription = reqBody.aboutDescription;
  let aboutCreatedDate = new Date(Date.now()).toISOString();
  let aboutUpdatedDate = new Date(Date.now()).toISOString();
  let activeStatus = reqBody.activeStatus;

  //Make res body for posting to the Database

  let postBody = {
    aboutImageLink: aboutImageLink,
    aboutTitle: aboutTitle,
    aboutDescription: aboutDescription,
    aboutCreatedDate: aboutCreatedDate,
    aboutUpdatedDate: aboutUpdatedDate,
    activeStatus: activeStatus,
  };

  // Create Database record
  aboutModel
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
exports.selectAbouts = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  aboutModel
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

exports.selectAboutsPlus = async (req, res) => {
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
        { activeStatus: SearchRgx },
        { "aboutTitle.en": SearchRgx },
        { "aboutDescription.en": SearchRgx },
      ],
    };

    const result = await aboutModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await aboutModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await aboutModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await aboutModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateAbout = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    aboutImageLink: reqBody.aboutImageLink,
    aboutTitle: {
      en: reqBody.aboutTitle.en,
      bn: reqBody.aboutTitle.bn,
    },
    aboutDescription: {
      en: reqBody.aboutDescription.en,
      bn: reqBody.aboutDescription.bn,
    },
    aboutUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  aboutModel
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
exports.deleteAbout = (req, res) => {
  let _id = req.params.id;

  aboutModel
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
