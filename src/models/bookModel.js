const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    bookID: { type: String, required: true, unique: true },
    bookName: {
      en: { type: String },
      bn: { type: String },
      ar: { type: String },
    },
    bookPublicationName: { type: String },
    bookPage: [],
    bookCreatedDate: { type: Date },
    bookUpdatedDate: { type: Date },
    bookLink: { type: String },
    activeStatus: {
      type: String,
      default: "active",
    },
  },
  { versionKey: false }
);

const BookModel = mongoose.model("books", DataSchema);

module.exports = BookModel;
