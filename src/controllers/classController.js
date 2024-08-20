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

exports.selectClassesPlus = async (req, res) => {
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
        { classID: SearchRgx },
        { courseID: SearchRgx },
        { departmentID: SearchRgx },
        { jamatID: SearchRgx },
        { semesterID: SearchRgx },
        { bookID: SearchRgx },
        { batchNo: SearchRgx },
        { activeStatus: SearchRgx },
        { "teacher.TID": SearchRgx },
        { "teacher.tName": SearchRgx },
        { "teacher.mobileNumber": SearchRgx },
      ],
    };

    const result = await classModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await classModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await classModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await classModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
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
