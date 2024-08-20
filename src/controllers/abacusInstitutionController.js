const abacusInstitutionModel = require("../models/abacusInstitutionModel");
const { hashedPasswordCustom } = require("../middlewares/passwordEncryption");

exports.createAbacusInstitution = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  function prefix(name) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth() + 1;

    const prefix =
      "IMI" +
      currentYear +
      String(currentMonthIndex).padStart(2, "0") +
      String(name).padStart(4, "0");
    return prefix;
  }

  let autoGeneratedname = prefix(reqBody.institutionID);

  let institutionID = autoGeneratedname;
  let institutionName = reqBody.institutionName;

  let principalName = reqBody.principalName;

  let studentsNumber = reqBody.studentsNumber;

  let directorPhone = reqBody.directorPhone;

  let representativeName = reqBody.representativeName;

  let representativePhone = reqBody.representativePhone;

  let institutionalEmail = reqBody.institutionalEmail;

  let registrationFeeAmount = reqBody.registrationFeeAmount;

  let registrationPaymentWay = reqBody.registrationPaymentWay;

  let paymentTransactionID = reqBody.paymentTransactionID;

  let paymentNumber = reqBody.paymentNumber;

  let abacusBookOrderlimit = reqBody.abacusBookOrderlimit;

  let abacusKitOrderlimit = reqBody.abacusKitOrderlimit;

  let password = req.headers["passKey"];

  let abacusCreatedDate = new Date(Date.now()).toISOString();

  let abacusUpdatedDate = new Date(Date.now()).toISOString();

  let activeStatus = reqBody.activeStatus;

  let batchCount = reqBody.batchCount;

  //Make res body for posting to the Database

  let postBody = {
    institutionID,
    institutionName,
    principalName,
    studentsNumber,
    directorPhone,
    representativeName,
    representativePhone,
    institutionalEmail,
    registrationFeeAmount,
    registrationPaymentWay,
    paymentTransactionID,
    paymentNumber,
    abacusBookOrderlimit,
    abacusKitOrderlimit,
    password,
    abacusCreatedDate,
    abacusUpdatedDate,
    activeStatus,
    batchCount,
  };

  // Create Database record
  abacusInstitutionModel
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
exports.selectAbacusInstitutions = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  abacusInstitutionModel
    .find(query, projection)
    .sort({ abacusCreatedDate: -1 })
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

exports.selectAbacusInstitutionsPlus = async (req, res) => {
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
        { institutionID: SearchRgx },
        { institutionName: SearchRgx },
        { principalName: SearchRgx },
        { studentsNumber: SearchRgx },
        { directorPhone: SearchRgx },
        { representativeName: SearchRgx },
        { representativePhone: SearchRgx },
        { institutionalEmail: SearchRgx },
        { batchCount: SearchRgx },
        { institutionalEmail: SearchRgx },
        { activeStatus: SearchRgx },
      ],
    };

    const result = await abacusInstitutionModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await abacusInstitutionModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await abacusInstitutionModel.aggregate([
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await abacusInstitutionModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateAbacusInstitution = async (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];

  let hashedPass = await hashedPasswordCustom(reqBody.password);
  var postBody;

  if (hashedPass == null) {
    postBody = {
      institutionName: reqBody.institutionName,
      principalName: reqBody.principalName,
      studentsNumber: reqBody.studentsNumber,
      directorPhone: reqBody.directorPhone,
      representativeName: reqBody.representativeName,
      representativePhone: reqBody.representativePhone,
      institutionalEmail: reqBody.institutionalEmail,
      registrationFeeAmount: reqBody.registrationFeeAmount,
      registrationPaymentWay: reqBody.registrationPaymentWay,
      paymentTransactionID: reqBody.paymentTransactionID,
      paymentNumber: reqBody.paymentNumber,
      abacusBookOrderlimit: reqBody.abacusBookOrderlimit,
      abacusKitOrderlimit: reqBody.abacusKitOrderlimit,
      abacusUpdatedDate: new Date(Date.now()).toISOString(),
      activeStatus: reqBody.activeStatus,
      batchCount: reqBody.batchCount,
    };
  } else {
    postBody = {
      institutionName: reqBody.institutionName,
      principalName: reqBody.principalName,
      studentsNumber: reqBody.studentsNumber,
      directorPhone: reqBody.directorPhone,
      representativeName: reqBody.representativeName,
      representativePhone: reqBody.representativePhone,
      institutionalEmail: reqBody.institutionalEmail,
      registrationFeeAmount: reqBody.registrationFeeAmount,
      registrationPaymentWay: reqBody.registrationPaymentWay,
      paymentTransactionID: reqBody.paymentTransactionID,
      paymentNumber: reqBody.paymentNumber,
      abacusBookOrderlimit: reqBody.abacusBookOrderlimit,
      abacusKitOrderlimit: reqBody.abacusKitOrderlimit,
      password: hashedPass,
      abacusUpdatedDate: new Date(Date.now()).toISOString(),
      activeStatus: reqBody.activeStatus,
      batchCount: reqBody.batchCount,
    };
  }

  abacusInstitutionModel
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
exports.deleteAbacusInstitution = (req, res) => {
  let _id = req.params.id;

  abacusInstitutionModel
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

exports.selectAbacusData = (userName) => {
  let query = userName;

  return abacusInstitutionModel
    .find({ institutionID: query }, null)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err; // Re-throwing the error to propagate it further
    });
};
