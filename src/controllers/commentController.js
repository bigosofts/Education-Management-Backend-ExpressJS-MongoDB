const commentModel = require("../models/commentModel");

exports.createComment = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let userName = reqBody.userName;
  let designation = reqBody.designation;
  let comment = reqBody.comment;
  let commentCreatedDate = new Date(Date.now()).toISOString();
  let commentUpdatedDate = new Date(Date.now()).toISOString();
  let commentIcon = reqBody.commentIcon;
  let commentId = reqBody.commentId;
  let activeStatus = reqBody.activeStatus;

  //Make res body for posting to the Database

  let postBody = {
    userName: userName,
    designation: designation,
    comment: comment,
    commentCreatedDate: commentCreatedDate,
    commentUpdatedDate: commentUpdatedDate,
    commentIcon: commentIcon,
    commentId: commentId,
    activeStatus: activeStatus,
  };

  // Create Database record
  commentModel
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
exports.selectComments = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  commentModel
    .find(query, projection)
    .sort({ commentCreatedDate: -1 })
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

//Update Database Record
exports.updateComment = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    commentId: reqBody.commentId,
    userName: {
      en: reqBody.userName.en,
      bn: reqBody.userName.bn,
    },
    designation: {
      en: reqBody.designation.en,
      bn: reqBody.designation.bn,
    },
    comment: {
      en: reqBody.comment.en,
      bn: reqBody.comment.bn,
    },
    commentUpdatedDate: new Date(Date.now()).toISOString(),
    commentIcon: reqBody.commentIcon,
    activeStatus: reqBody.activeStatus,
  };

  commentModel
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
exports.deleteComment = (req, res) => {
  let _id = req.params.id;

  commentModel
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
