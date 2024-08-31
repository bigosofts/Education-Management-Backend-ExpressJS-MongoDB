const studentProfileModel = require("../models/studentProfileModel");

const studentProfileActiveModel = require("../models/activeStudentProfileModel");
const studentProfileDueModel = require("../models/dueStudentProfileModel");
const studentProfilePendingModel = require("../models/pendingStudentProfileModel");

const teacherProfileModel = require("../models/teacherProfileModel");
const { hashedPasswordCustom } = require("../middlewares/passwordEncryption");
const paymentModel = require("../models/paymentModel");
// const userPermission =require("../middlewares/userPermissionCheck");

//creating student records to database
exports.createStudent = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  function prefix(name) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth() + 1;

    const prefix =
      "IMS" +
      currentYear +
      String(currentMonthIndex).padStart(2, "0") +
      String(name).padStart(4, "0");
    return prefix;
  }

  let autoGeneratedname = prefix(reqBody.userName);

  let userName = autoGeneratedname;
  let details = reqBody.details;
  let firstName = reqBody.firstName;
  let lastName = reqBody.lastName;
  let nidNumber = reqBody.nidNumber;
  let birthRegNumber = reqBody.birthRegNumber;
  let fatherName = reqBody.fatherName;
  let emailAddress = reqBody.emailAddress;
  let password = req.headers["passKey"];
  let mobileNumber = reqBody.mobileNumber;
  let occupation = reqBody.occupation;
  let extracurricular = reqBody.extracurricular;
  let studentCourseCode = reqBody.studentCourseCode;
  let studentJamatCode = reqBody.studentJamatCode;
  let gender = reqBody.gender;
  let dateOfBirth = reqBody.dateOfBirth;
  let countryName = reqBody.countryName;
  let fullPresentAddress = reqBody.fullPresentAddress;
  let fullPermanentAddress = reqBody.fullPermanentAddress;
  let admissionDate = new Date(Date.now()).toISOString();
  let admissionSession = reqBody.admissionSession;
  let studentMotive = reqBody.studentMotive;
  let paymentStatus = reqBody.paymentStatus;
  let activeStatus = reqBody.activeStatus;
  let userRole = reqBody.userRole;
  let studentDepartment = reqBody.studentDepartment;
  let studentSemester = reqBody.studentSemester;
  let batchCount = reqBody.batchCount;
  let fundStatus = reqBody.fundStatus;
  let accountStatus = reqBody.accountStatus;

  //Make res body for posting to the Database

  let postBody = {
    userName: userName,
    details: details,
    firstName: firstName,
    lastName: lastName,
    nidNumber: nidNumber,
    birthRegNumber: birthRegNumber,
    fatherName: fatherName,
    emailAddress: emailAddress,
    password: password,
    mobileNumber: mobileNumber,
    occupation: occupation,
    extracurricular: extracurricular,
    studentCourseCode: studentCourseCode,
    studentJamatCode: studentJamatCode,
    gender: gender,
    dateOfBirth: dateOfBirth,
    countryName: countryName,
    fullPresentAddress: fullPresentAddress,
    fullPermanentAddress: fullPermanentAddress,
    admissionDate: admissionDate,
    admissionSession: admissionSession,
    studentMotive: studentMotive,
    paymentStatus: paymentStatus,
    activeStatus: activeStatus,
    userRole: userRole,
    studentDepartment: studentDepartment,
    studentSemester: studentSemester,
    batchCount: batchCount,
    fundStatus: fundStatus,
    accountStatus: accountStatus,
  };

  // Create Database record
  studentProfileModel
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
exports.selectStudents = (req, res) => {
  let query = req.headers["userName"];
  let projection = req.body.projection;
  studentProfileModel
    .find({ userName: query }, projection)
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

exports.selectStudentData = (userName) => {
  let query = userName;

  return studentProfileModel
    .find({ userName: query }, null)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err; // Re-throwing the error to propagate it further
    });
};

exports.selectAllStudents = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  studentProfileModel
    .find(query, projection)
    .sort({ admissionDate: -1 })
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

exports.selectAllStudentsPlus = async (req, res) => {
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
        { userName: SearchRgx },
        { mobileNumber: SearchRgx },
        { emailAddress: SearchRgx },
        { batchCount: SearchRgx },
        { fundStatus: SearchRgx },
        { countryName: SearchRgx },
        { gender: SearchRgx },
        { userRole: SearchRgx },
        { nidNumber: SearchRgx },
        { occupation: SearchRgx },
        { fullPresentAddress: SearchRgx },
        { fullPermanentAddress: SearchRgx },
        { fullPermanentAddress: SearchRgx },
        { admissionDate: SearchRgx },
        { activeStatus: SearchRgx },
        { "firstName.en": SearchRgx },
        { "lastName.en": SearchRgx },
        { "fatherName.en": SearchRgx },
        { "paymentStatus.paymentID": SearchRgx },
      ],
    };

    const result = await studentProfileModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await studentProfileModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await studentProfileModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await studentProfileModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }

  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

exports.selectAllStudentsMonthlyActivePlus = async (req, res) => {
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
        { userName: SearchRgx },
        { mobileNumber: SearchRgx },
        { emailAddress: SearchRgx },
        { batchCount: SearchRgx },
        { fundStatus: SearchRgx },
        { countryName: SearchRgx },
        { gender: SearchRgx },
        { userRole: SearchRgx },
        { nidNumber: SearchRgx },
        { occupation: SearchRgx },
        { fullPresentAddress: SearchRgx },
        { fullPermanentAddress: SearchRgx },
        { fullPermanentAddress: SearchRgx },
        { admissionDate: SearchRgx },
        { activeStatus: SearchRgx },
        { "firstName.en": SearchRgx },
        { "lastName.en": SearchRgx },
        { "fatherName.en": SearchRgx },
        { "paymentStatus.paymentID": SearchRgx },
      ],
    };

    const result = await studentProfileActiveModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await studentProfileActiveModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await studentProfileActiveModel.aggregate([
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await studentProfileActiveModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }

  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

exports.selectAllStudentsMonthlyDuePlus = async (req, res) => {
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
        { userName: SearchRgx },
        { mobileNumber: SearchRgx },
        { emailAddress: SearchRgx },
        { batchCount: SearchRgx },
        { fundStatus: SearchRgx },
        { countryName: SearchRgx },
        { gender: SearchRgx },
        { userRole: SearchRgx },
        { nidNumber: SearchRgx },
        { occupation: SearchRgx },
        { fullPresentAddress: SearchRgx },
        { fullPermanentAddress: SearchRgx },
        { fullPermanentAddress: SearchRgx },
        { admissionDate: SearchRgx },
        { activeStatus: SearchRgx },
        { "firstName.en": SearchRgx },
        { "lastName.en": SearchRgx },
        { "fatherName.en": SearchRgx },
        { "paymentStatus.paymentID": SearchRgx },
      ],
    };

    const result = await studentProfileDueModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await studentProfileDueModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await studentProfileDueModel.aggregate([
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await studentProfileDueModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }

  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

exports.selectAllStudentsMonthlyPendingPlus = async (req, res) => {
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
        { userName: SearchRgx },
        { mobileNumber: SearchRgx },
        { emailAddress: SearchRgx },
        { batchCount: SearchRgx },
        { fundStatus: SearchRgx },
        { countryName: SearchRgx },
        { gender: SearchRgx },
        { userRole: SearchRgx },
        { nidNumber: SearchRgx },
        { occupation: SearchRgx },
        { fullPresentAddress: SearchRgx },
        { fullPermanentAddress: SearchRgx },
        { fullPermanentAddress: SearchRgx },
        { admissionDate: SearchRgx },
        { activeStatus: SearchRgx },
        { "firstName.en": SearchRgx },
        { "lastName.en": SearchRgx },
        { "fatherName.en": SearchRgx },
        { "paymentStatus.paymentID": SearchRgx },
      ],
    };

    const result = await studentProfilePendingModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await studentProfilePendingModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await studentProfilePendingModel.aggregate([
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await studentProfilePendingModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }

  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateStudent = async (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let hashedPass = await hashedPasswordCustom(reqBody.password);
  var postBody;

  if (hashedPass == null) {
    postBody = {
      firstName: {
        en: reqBody.firstName.en,
        bn: reqBody.firstName.bn,
      },
      lastName: {
        en: reqBody.lastName.en,
        bn: reqBody.lastName.bn,
      },
      nidNumber: reqBody.nidNumber,
      birthRegNumber: reqBody.birthRegNumber,
      fatherName: {
        en: reqBody.fatherName.en,
        bn: reqBody.fatherName.bn,
      },
      emailAddress: reqBody.emailAddress,
      mobileNumber: reqBody.mobileNumber,
      occupation: reqBody.occupation,
      extracurricular: reqBody.extracurricular,
      studentCourseCode: reqBody.studentCourseCode,
      studentJamatCode: reqBody.studentJamatCode,
      gender: reqBody.gender,
      dateOfBirth: reqBody.dateOfBirth,
      countryName: reqBody.countryName,
      fullPresentAddress: reqBody.fullPresentAddress,
      fullPermanentAddress: reqBody.fullPermanentAddress,
      admissionSession: reqBody.admissionSession,
      studentMotive: reqBody.studentMotive,
      paymentStatus: reqBody.paymentStatus,
      activeStatus: reqBody.activeStatus,
      userRole: reqBody.userRole,
      userName: reqBody.userName,
      details: reqBody.details,
      admissionDate: reqBody.admissionDate,
      studentDepartment: reqBody.studentDepartment,
      studentSemester: reqBody.studentSemester,
      batchCount: reqBody.batchCount,
      fundStatus: reqBody.fundStatus,
      accountStatus: reqBody.accountStatus,
    };
  } else {
    postBody = {
      firstName: {
        en: reqBody.firstName.en,
        bn: reqBody.firstName.bn,
      },
      lastName: {
        en: reqBody.lastName.en,
        bn: reqBody.lastName.bn,
      },
      nidNumber: reqBody.nidNumber,
      birthRegNumber: reqBody.birthRegNumber,
      fatherName: {
        en: reqBody.fatherName.en,
        bn: reqBody.fatherName.bn,
      },
      emailAddress: reqBody.emailAddress,
      mobileNumber: reqBody.mobileNumber,
      occupation: reqBody.occupation,
      extracurricular: reqBody.extracurricular,
      studentCourseCode: reqBody.studentCourseCode,
      studentJamatCode: reqBody.studentJamatCode,
      gender: reqBody.gender,
      dateOfBirth: reqBody.dateOfBirth,
      countryName: reqBody.countryName,
      password: hashedPass,
      fullPresentAddress: reqBody.fullPresentAddress,
      fullPermanentAddress: reqBody.fullPermanentAddress,
      admissionSession: reqBody.admissionSession,
      studentMotive: reqBody.studentMotive,
      paymentStatus: reqBody.paymentStatus,
      activeStatus: reqBody.activeStatus,
      userRole: reqBody.userRole,
      userName: reqBody.userName,
      details: reqBody.details,
      admissionDate: reqBody.admissionDate,
      studentDepartment: reqBody.studentDepartment,
      studentSemester: reqBody.studentSemester,
      batchCount: reqBody.batchCount,
      fundStatus: reqBody.fundStatus,
      accountStatus: reqBody.accountStatus,
    };
  }

  studentProfileModel
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
exports.deleteStudent = (req, res) => {
  let _id = req.params.id;

  studentProfileModel
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

//Teacher Profile created to Database
exports.createTeacher = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  function prefix(name) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth() + 1;

    const prefix =
      "IMT" +
      currentYear +
      String(currentMonthIndex).padStart(2, "0") +
      String(name).padStart(4, "0");
    return prefix;
  }

  let autoGeneratedname = prefix(reqBody.userName);

  let userName = autoGeneratedname;
  let firstName = reqBody.firstName;
  let lastName = reqBody.lastName;
  let nidNumber = reqBody.nidNumber;
  let birthRegNumber = reqBody.birthRegNumber;
  let fatherName = reqBody.fatherName;
  let emailAddress = reqBody.emailAddress;
  let password = req.headers["passKey"];
  let mobileNumber = reqBody.mobileNumber;
  let teacherCourseCode = reqBody.teacherCourseCode;
  let teacherJamatCode = reqBody.teacherJamatCode;
  let gender = reqBody.gender;
  let dateOfBirth = reqBody.dateOfBirth;
  let countryName = reqBody.countryName;
  let fullPresentAddress = reqBody.fullPresentAddress;
  let fullPermanentAddress = reqBody.fullPermanentAddress;
  let educationalBackground = reqBody.educationalBackground;
  let activeStatus = reqBody.activeStatus;
  let userRole = reqBody.userRole;
  let designation = reqBody.designation;
  let details = reqBody.details;

  //Make res body for posting to the Database

  let postBody = {
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    nidNumber: nidNumber,
    birthRegNumber: birthRegNumber,
    fatherName: fatherName,
    emailAddress: emailAddress,
    password: password,
    mobileNumber: mobileNumber,
    teacherCourseCode: teacherCourseCode,
    teacherJamatCode: teacherJamatCode,
    gender: gender,
    dateOfBirth: dateOfBirth,
    countryName: countryName,
    fullPresentAddress: fullPresentAddress,
    fullPermanentAddress: fullPermanentAddress,
    educationalBackground: educationalBackground,
    activeStatus: activeStatus,
    userRole: userRole,
    designation: designation,
    details: details,
  };

  // Create Database record
  teacherProfileModel
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

exports.selectTeacherData = (userName) => {
  let query = userName;
  return teacherProfileModel
    .find({ userName: query }, null)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

//Read or select Database Record
exports.selectTeachers = (req, res) => {
  let query = req.headers["userName"];
  let projection = req.body.projection;
  teacherProfileModel
    .find({ userName: query }, projection)
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
//Read all teachers
exports.selectAllTeachers = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  teacherProfileModel
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

exports.selectAllTeachersPlus = async (req, res) => {
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
        { userName: SearchRgx },
        { mobileNumber: SearchRgx },
        { emailAddress: SearchRgx },
        { gender: SearchRgx },
        { countryName: SearchRgx },
        { fullPresentAddress: SearchRgx },
        { fullPermanentAddress: SearchRgx },
        { educationalBackground: SearchRgx },
        { "firstName.en": SearchRgx },
        { "lastName.en": SearchRgx },
        { "fatherName.en": SearchRgx },
        { "fatherName.en": SearchRgx },
      ],
    };

    const result = await teacherProfileModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await teacherProfileModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await teacherProfileModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await teacherProfileModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateTeacher = async (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let hashedPass = await hashedPasswordCustom(reqBody.password);
  var postBody;
  if (hashedPass == null) {
    postBody = {
      firstName: {
        en: reqBody.firstName.en,
        bn: reqBody.firstName.bn,
      },
      lastName: {
        en: reqBody.lastName.en,
        bn: reqBody.lastName.bn,
      },
      nidNumber: reqBody.nidNumber,
      birthRegNumber: reqBody.birthRegNumber,
      fatherName: {
        en: reqBody.fatherName.en,
        bn: reqBody.fatherName.bn,
      },
      emailAddress: reqBody.emailAddress,
      mobileNumber: reqBody.mobileNumber,
      occupation: reqBody.occupation,
      teacherCourseCode: reqBody.teacherCourseCode,
      teacherJamatCode: reqBody.teacherJamatCode,
      gender: reqBody.gender,
      dateOfBirth: reqBody.dateOfBirth,
      countryName: reqBody.countryName,
      fullPresentAddress: reqBody.fullPresentAddress,
      fullPermanentAddress: reqBody.fullPermanentAddress,
      educationalBackground: reqBody.educationalBackground,
      activeStatus: reqBody.activeStatus,
      userRole: reqBody.userRole,
      userName: reqBody.userName,
      designation: reqBody.designation,
    };
  } else {
    postBody = {
      firstName: {
        en: reqBody.firstName.en,
        bn: reqBody.firstName.bn,
      },
      lastName: {
        en: reqBody.lastName.en,
        bn: reqBody.lastName.bn,
      },
      nidNumber: reqBody.nidNumber,
      birthRegNumber: reqBody.birthRegNumber,
      fatherName: {
        en: reqBody.fatherName.en,
        bn: reqBody.fatherName.bn,
      },
      emailAddress: reqBody.emailAddress,
      password: hashedPass,
      mobileNumber: reqBody.mobileNumber,
      occupation: reqBody.occupation,
      teacherCourseCode: reqBody.teacherCourseCode,
      teacherJamatCode: reqBody.teacherJamatCode,
      gender: reqBody.gender,
      dateOfBirth: reqBody.dateOfBirth,
      countryName: reqBody.countryName,
      fullPresentAddress: reqBody.fullPresentAddress,
      fullPermanentAddress: reqBody.fullPermanentAddress,
      educationalBackground: reqBody.educationalBackground,
      activeStatus: reqBody.activeStatus,
      userRole: reqBody.userRole,
      userName: reqBody.userName,
      designation: reqBody.designation,
    };
  }

  teacherProfileModel
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
exports.deleteTeacher = (req, res) => {
  let _id = req.params.id;

  teacherProfileModel
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
