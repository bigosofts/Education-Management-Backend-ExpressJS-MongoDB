const studentProfileModel = require("../models/studentProfileModel");
const teacherProfileModel = require("../models/teacherProfileModel");
const abacusInstitutionModel = require("../models/abacusInstitutionModel");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../../config.env" });

exports.studentLogin = (req, res) => {
  let userName = req.headers["userName"];
  studentProfileModel
    .findOne(
      { userName: userName, activeStatus: "active" },
      { password: false }
    )
    .then((data) => {
      // Create Auth Token
      let Payload = {
        exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        data: {
          userName: data.userName,
          userRole: data.userRole,
          isAdmin: data.isAdmin,
        },
      };
      let token = jwt.sign(Payload, process.env.SECRETKEY_JWT_WEBTOKEN);
      res.status(200).json({
        status: "Alhamdulillah",
        token: token,
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

exports.institutionLogin = (req, res) => {
  let userName = req.headers["userName"];
  abacusInstitutionModel
    .findOne({ institutionID: userName }, { password: false })
    .then((data) => {
      // Create Auth Token
      let Payload = {
        exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        data: {
          userName: data.institutionID,
          userRole: "abacus_teacher",
          isAdmin: false,
        },
      };
      let token = jwt.sign(Payload, process.env.SECRETKEY_JWT_WEBTOKEN);
      res.status(200).json({
        status: "Alhamdulillah",
        token: token,
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

exports.teacherLogin = (req, res) => {
  let userName = req.headers["userName"];

  teacherProfileModel
    .findOne(
      { userName: userName, activeStatus: "active" },
      { password: false }
    )
    .then((data) => {
      // Create Auth Token
      let Payload = {
        exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
        data: {
          userName: data.userName,
          userRole: data.userRole,
          isAdmin: data.isAdmin,
        },
      };
      let token = jwt.sign(Payload, process.env.SECRETKEY_JWT_WEBTOKEN);
      res.status(200).json({
        status: "Alhamdulillah",
        token: token,
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
