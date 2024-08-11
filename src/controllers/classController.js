const classModel = require("../models/classModel");

exports.createClass = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  let postBody = {
    classID: reqBody.classID,
    batchNo: reqBody.batchNo,
    maleClassLink: reqBody.maleClassLink,
    femaleClassLink: reqBody.femaleClassLink,
    courseID: reqBody.courseID,
    departmentID: reqBody.departmentID,
    jamatID: reqBody.jamatID,
    semesterID: reqBody.semesterID,
    bookID: reqBody.bookID,
    teacher: reqBody.teacher,
    examQuestion: reqBody.examQuestion,
    students: reqBody.students,
    classStartTime: reqBody.classStartTime,
    classEndTime: reqBody.classEndTime,
    createdDate: new Date(Date.now()).toISOString(),
    updatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  //Make res body for posting to the Database

  // Create Database record
  classModel
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
exports.selectClasses = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  classModel
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

//Update Database Record
exports.updateClass = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    classID: reqBody.classID,
    batchNo: reqBody.batchNo,
    maleClassLink: reqBody.maleClassLink,
    femaleClassLink: reqBody.femaleClassLink,
    courseID: reqBody.courseID,
    departmentID: reqBody.departmentID,
    jamatID: reqBody.jamatID,
    semesterID: reqBody.semesterID,
    bookID: reqBody.bookID,
    teacher: reqBody.teacher,
    examQuestion: reqBody.examQuestion,
    students: reqBody.students,
    classStartTime: reqBody.classStartTime,
    classEndTime: reqBody.classEndTime,
    updatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  classModel
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
exports.deleteClass = (req, res) => {
  let _id = req.params.id;

  classModel
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
