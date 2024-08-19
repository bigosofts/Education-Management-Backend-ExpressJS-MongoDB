const postModel = require("../models/postModel");

exports.createPost = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let postTitle = reqBody.postTitle;
  let postDescription = reqBody.postDescription;
  let postImageLink = reqBody.postImageLink;
  let postCategory = reqBody.postCategory;
  let postCreatedDate = new Date(Date.now()).toISOString();
  let postUpdatedDate = new Date(Date.now()).toISOString();
  let postUser = reqBody.postUser;
  let postPopularity = reqBody.postPopularity;
  let postId = reqBody.postId;
  let activeStatus = reqBody.activeStatus;

  //Make res body for posting to the Database

  let postBody = {
    postImageLink: postImageLink,
    postTitle: postTitle,
    postDescription: postDescription,
    postCategory: postCategory,
    postCreatedDate: postCreatedDate,
    postUpdatedDate: postUpdatedDate,
    postUser: postUser,
    postPopularity: postPopularity,
    postId: postId,
    activeStatus: activeStatus,
  };

  // Create Database record
  postModel
    .create(postBody)
    .then((data) => {
      res.status(200).json({
        status: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        data: err,
      });
    });
};

// find from the database record
exports.selectPosts = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  postModel
    .find(query, projection)
    .sort({ postCreatedDate: -1 })
    .then((data) => {
      res.status(200).json({
        status: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        data: err,
      });
    });
};

exports.selectPostsPlus = async (req, res) => {
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
        { postId: SearchRgx },
        { postUser: SearchRgx },
        { activeStatus: SearchRgx },
        { "postTitle.en": SearchRgx },
        { "postCategory.en": SearchRgx },
        { "postDescription.en": SearchRgx },
        { "postPopularity.en": SearchRgx },
      ],
    };

    const result = await postModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await postModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await postModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await postModel.aggregate([{ $skip: skipRow }, { $limit: perPage }]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updatePost = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    postId: reqBody.postId,
    postImageLink: reqBody.postImageLink,
    postTitle: {
      en: reqBody.postTitle.en,
    },
    postDescription: {
      en: reqBody.postDescription.en,
    },
    postCategory: {
      en: reqBody.postCategory.en,
    },
    postUpdatedDate: new Date(Date.now()).toISOString(),
    postPopularity: {
      en: reqBody.postPopularity.en,
    },
    postUser: reqBody.postUser,
    activeStatus: reqBody.activeStatus,
  };

  postModel
    .updateOne({ _id: filter }, { $set: postBody }, { upsert: true })
    .then((data) => {
      res.status(200).json({
        status: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        data: err,
      });
    });
};

//Deleting from database
exports.deletePost = (req, res) => {
  let _id = req.params.id;

  postModel
    .deleteOne({ _id: _id })
    .then((data) => {
      res.status(200).json({
        status: "Success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        data: err,
      });
    });
};
