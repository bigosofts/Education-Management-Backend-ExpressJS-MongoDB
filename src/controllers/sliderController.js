const sliderModel = require("../models/sliderModel");

exports.createSlider = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let sliderImageLink = reqBody.sliderImageLink;
  let sliderTitle = reqBody.sliderTitle;
  let sliderDescription = reqBody.sliderDescription;
  let sliderButtonTitle = reqBody.sliderButtonTitle;
  let sliderButtonLink = reqBody.sliderButtonLink;
  let sliderId = reqBody.sliderId;
  let sliderName = reqBody.sliderName;
  let activeStatus = reqBody.activeStatus;
  //Make res body for posting to the Database

  let postBody = {
    sliderImageLink: sliderImageLink,
    sliderTitle: sliderTitle,
    sliderName: sliderName,
    sliderDescription: sliderDescription,
    sliderButtonTitle: sliderButtonTitle,
    sliderButtonLink: sliderButtonLink,
    sliderId: sliderId,
    activeStatus: activeStatus,
  };

  // Create Database record
  sliderModel
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
exports.selectSliders = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  sliderModel
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

exports.selectSlidersPlus = async (req, res) => {
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
        { sliderName: SearchRgx },
        { "sliderTitle.en": SearchRgx },
        { "sliderDescription.en": SearchRgx },
        { "sliderButtonTitle.en": SearchRgx },
      ],
    };

    const result = await sliderModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await sliderModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await sliderModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await sliderModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateSlider = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    sliderImageLink: reqBody.sliderImageLink,
    sliderId: reqBody.sliderId,
    sliderName: reqBody.sliderName,
    sliderTitle: {
      en: reqBody.sliderTitle.en,
      bn: reqBody.sliderTitle.bn,
    },
    sliderDescription: {
      en: reqBody.sliderDescription.en,
      bn: reqBody.sliderDescription.bn,
    },
    sliderButtonTitle: {
      en: reqBody.sliderButtonTitle.en,
      bn: reqBody.sliderButtonTitle.bn,
    },
    sliderButtonLink: reqBody.sliderButtonLink,
    activeStatus: reqBody.activeStatus,
  };

  sliderModel
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
exports.deleteSlider = (req, res) => {
  let _id = req.params.id;

  sliderModel
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
