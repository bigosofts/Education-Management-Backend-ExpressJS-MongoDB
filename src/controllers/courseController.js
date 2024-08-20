const courseModel = require("../models/courseModel");

exports.createCourse = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  let courseCode = reqBody.courseCode;
  let imageLink = reqBody.imageLink;
  let title = reqBody.title;
  let description = reqBody.description;
  let categories = reqBody.categories;
  let createdDate = new Date(Date.now()).toISOString();
  let updatedDate = new Date(Date.now()).toISOString();
  let startingDate = reqBody.startingDate;
  let popularity = reqBody.popularity;
  let jamatName = reqBody.jamatName;
  let activeStatus = reqBody.activeStatus;
  let instructor = reqBody.instructor;
  let coursePrice = reqBody.coursePrice;
  let courseButton = reqBody.courseButton;
  let courseInfo = reqBody.courseInfo;
  let detailData = reqBody.detailData;
  let courseSyllabus = reqBody.courseSyllabus;
  let faq = reqBody.faq;
  let commentID = reqBody.commentID;
  let courseMaterial = reqBody.courseMaterial;
  let commonQuestion = reqBody.commonQuestion;
  let courseVideoID = reqBody.courseVideoID;

  //Make res body for posting to the Database

  let postBody = {
    courseCode,
    imageLink,
    title,
    description,
    categories,
    createdDate,
    updatedDate,
    startingDate,
    popularity,
    jamatName,
    activeStatus,
    instructor,
    coursePrice,
    courseButton,
    courseInfo,
    detailData,
    courseSyllabus,
    faq,
    commentID,
    courseMaterial,
    commonQuestion,
    courseVideoID,
  };

  // Create Database record
  courseModel
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
exports.selectCourses = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  courseModel
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

exports.selectCoursesPlus = async (req, res) => {
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
        { courseCode: SearchRgx },
        { title: SearchRgx },
        { activeStatus: SearchRgx },
        { "description.en": SearchRgx },
      ],
    };

    const result = await courseModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await courseModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await courseModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await courseModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateCourse = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];

  let courseCode = reqBody.courseCode;
  let imageLink = reqBody.imageLink;
  let title = reqBody.title;
  let description = reqBody.description;
  let categories = reqBody.categories;
  let updatedDate = new Date(Date.now()).toISOString();
  let startingDate = reqBody.startingDate;
  let popularity = reqBody.popularity;
  let jamatName = reqBody.jamatName;
  let activeStatus = reqBody.activeStatus;
  let instructor = reqBody.instructor;
  let coursePrice = reqBody.coursePrice;
  let courseButton = reqBody.courseButton;
  let courseInfo = reqBody.courseInfo;
  let detailData = reqBody.detailData;
  let courseSyllabus = reqBody.courseSyllabus;
  let faq = reqBody.faq;
  let commentID = reqBody.commentID;
  let courseMaterial = reqBody.courseMaterial;
  let commonQuestion = reqBody.commonQuestion;
  let courseVideoID = reqBody.courseVideoID;

  let postBody = {
    courseCode,
    imageLink,
    title,
    description,
    categories,
    updatedDate,
    startingDate,
    popularity,
    jamatName,
    activeStatus,
    instructor,
    coursePrice,
    courseButton,
    courseInfo,
    detailData,
    courseSyllabus,
    faq,
    commentID,
    courseMaterial,
    commonQuestion,
    courseVideoID,
  };

  courseModel
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
exports.deleteCourse = (req, res) => {
  let _id = req.params.id;

  courseModel
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
