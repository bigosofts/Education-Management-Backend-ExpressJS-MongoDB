const bookModel = require("../models/bookModel");

exports.createBook = (req, res) => {
  //Receive Post Request Data from req body
  let reqBody = req.body;

  //Make res body for posting to the Database

  let postBody = {
    bookID: reqBody.bookID,
    bookName: reqBody.bookName,
    bookPublicationName: reqBody.bookPublicationName,
    bookPage: reqBody.bookPage,
    bookCreatedDate: new Date(Date.now()).toISOString(),
    bookUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
    bookLink: reqBody.bookLink,
  };

  // Create Database record
  bookModel
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
exports.selectBooks = (req, res) => {
  let query = req.body.query;
  let projection = req.body.projection;
  bookModel
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

exports.selectBooksPlus = async (req, res) => {
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
        { bookID: SearchRgx },
        { bookPublicationName: SearchRgx },
        { activeStatus: SearchRgx },
        { "bookName.en": SearchRgx },
      ],
    };

    const result = await bookModel.aggregate([
      { $match: SearchQuery },
      { $count: "total" },
    ]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await bookModel.aggregate([
      { $match: SearchQuery },
      { $skip: skipRow },
      { $limit: perPage },
    ]);
  } else {
    const result = await bookModel.aggregate([{ $count: "total" }]);

    Total = result.length > 0 ? result[0]["total"] : 0;

    Rows = await bookModel.aggregate([{ $skip: skipRow }, { $limit: perPage }]);
  }
  res.status(200).json({ status: "Alhamdulillah", total: Total, data: Rows });
};

//Update Database Record
exports.updateBook = (req, res) => {
  let reqBody = req.body;
  let filter = reqBody["_id"];
  let postBody = {
    bookID: reqBody.bookID,
    bookName: reqBody.bookName,
    bookPublicationName: reqBody.bookPublicationName,
    bookPage: reqBody.bookPage,
    bookUpdatedDate: new Date(Date.now()).toISOString(),
    activeStatus: reqBody.activeStatus,
    bookLink: reqBody.bookLink,
  };

  bookModel
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
exports.deleteBook = (req, res) => {
  let _id = req.params.id;

  bookModel
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
