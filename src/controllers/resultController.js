const resultModel = require("../models/resultModel");

exports.createResult = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;
  let resultRollNo = reqBody.resultRollNo;
  let resultRegNo = reqBody.resultRegNo;
  let studentUserId = reqBody.studentUserId;
  let studentExamMadrasha = reqBody.studentExamMadrasha;
  let studentExamCentre = reqBody.studentExamCentre;
  let studentSubMark = reqBody.studentSubMark;
  let studentGrade = reqBody.studentGrade;
  let studentMerit = reqBody.studentMerit;
  let activeStatus = reqBody.activeStatus;
  let passingYear = reqBody.passingYear;
  let picture = reqBody.picture;
  let marhala = reqBody.marhala;

  //Make res body for posting to the Database

  let postBody = {
    resultRollNo: resultRollNo,
    resultRegNo: resultRegNo,
    studentUserId: studentUserId,
    studentExamMadrasha: studentExamMadrasha,
    studentExamCentre: studentExamCentre,
    studentSubMark: studentSubMark,
    studentGrade: studentGrade,
    studentMerit: studentMerit,
    activeStatus: activeStatus,
    passingYear: passingYear,
    picture: picture,
    marhala: marhala,
  };

  // Create Database record
  resultModel
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
exports.selectResults = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  resultModel
    .find(query, projection)
    .sort({ passingYear: -1 })
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
exports.selectResultslimit = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  resultModel
    .find(query, projection)
    .sort({ passingYear: -1 })
    .limit(6)
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
exports.updateResult = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    resultRollNo: reqBody.resultRollNo,
    resultRegNo: reqBody.resultRegNo,
    studentUserId: reqBody.studentUserId,
    studentExamMadrasha: reqBody.studentExamMadrasha,
    studentExamCentre: reqBody.studentExamCentre,
    studentSubMark: reqBody.studentSubMark,
    studentGrade: reqBody.studentGrade,
    studentMerit: reqBody.studentMerit,
    activeStatus: reqBody.activeStatus,
    passingYear: reqBody.passingYear,
    picture: reqBody.picture,
    marhala: reqBody.marhala,
  };

  resultModel
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
exports.deleteResult = (req, res) => {
  let _id = req.params.id;

  resultModel
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
