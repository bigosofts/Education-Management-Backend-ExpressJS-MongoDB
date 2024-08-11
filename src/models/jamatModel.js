const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    jamatID: { type: String, required: true, unique: true },
    jamatName: { type: String, required: true },
    semesters: [],
    jamatCreatedDate: { type: Date },
    jamatUpdatedDate: { type: Date },
    activeStatus: {
      type: String,
      default: "active",
    },
  },
  { versionKey: false }
);

const JamatModel = mongoose.model("jamats", DataSchema);

module.exports = JamatModel;
