const cloudinaryImageModel = require("../models/cloudinaryImageModel");

const cloudinary = require("../utility/cloudinary");

exports.createImage = async (req, res) => {
  //Receive Post Request Data from req body

  let reqBody = req.body;

  let image = reqBody.image;

  const result = await cloudinary.uploader.upload(image, {
    folder: "uploaded_image",
  });

  let imageLink = {
    public_id: result.public_id,
    url: result.secure_url,
  };
  let imageName = reqBody.imageName;
  let imageCreatedDate = new Date(Date.now()).toISOString();
  let imageUpdatedDate = new Date(Date.now()).toISOString();
  let status = reqBody.status;

  //Make res body for posting to the Database

  let postBody = {
    imageLink,
    imageName,
    imageCreatedDate,
    imageUpdatedDate,
    status,
  };

  // Create Database record
  cloudinaryImageModel
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
exports.selectImages = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  cloudinaryImageModel
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

exports.selectImagesPlus = async (req, res) => {
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
        { imageName: SearchRgx },

        { status: SearchRgx },
        { "imageLink.public_id": SearchRgx },
        { "imageLink.url": SearchRgx },
      ],
    };

    const result = await cloudinaryImageModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await cloudinaryImageModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await cloudinaryImageModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await cloudinaryImageModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateImage = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    imageLink: reqBody.imageLink,
    imageName: reqBody.imageName,
    imageUpdatedDate: new Date(Date.now()).toISOString(),
    status: reqBody.activeStatus,
  };

  cloudinaryImageModel
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
exports.deleteImage = (req, res) => {
  let _id = req.params.id;

  cloudinaryImageModel
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
