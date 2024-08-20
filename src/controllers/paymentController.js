const paymentModel = require("../models/paymentModel");

exports.createPayments = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  //Make res body for posting to the Database

  let postBody = {
    paymentID: reqBody.paymentID,
    paymentCurrency: reqBody.paymentCurrency,
    admissionDate: reqBody.admissionDate,

    admissionPrice: reqBody.admissionPrice,
    monthlyPaymentPrice: reqBody.monthlyPaymentPrice,
    admissionPaymentHistory: reqBody.admissionPaymentHistory,
    monthlyPaymentHistory: reqBody.monthlyPaymentHistory,
    paymentCreatedDate: new Date(Date.now()).toISOString(),
    paymentUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  // Create Database record
  paymentModel
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
exports.selectPayments = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  paymentModel
    .find(query, projection)
    .sort({ paymentCreatedDate: -1 })
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

exports.selectPaymentsPlus = async (req, res) => {
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
        { paymentID: SearchRgx },
        { paymentCurrency: SearchRgx },
        { activeStatus: SearchRgx },
        { "admissionPrice.tk": SearchRgx },
        { "monthlyPaymentPrice.tk": SearchRgx },
      ],
    };

    const result = await paymentModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await paymentModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await paymentModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await paymentModel.aggregate([
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updatePayment = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    paymentID: reqBody.paymentID,
    paymentCurrency: reqBody.paymentCurrency,
    admissionDate: reqBody.admissionDate,

    admissionPrice: reqBody.admissionPrice,
    monthlyPaymentPrice: reqBody.monthlyPaymentPrice,
    admissionPaymentHistory: reqBody.admissionPaymentHistory,
    monthlyPaymentHistory: reqBody.monthlyPaymentHistory,
    paymentUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
  };

  paymentModel
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
exports.deletePayment = (req, res) => {
  let _id = req.params.id;

  paymentModel
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
