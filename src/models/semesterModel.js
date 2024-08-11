const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    semesterID: { type: String, required: true, unique: true },
    semesterName: { type: String, required: true },
    semesterBooks: [],
    semesterCreatedDate: { type: Date },
    semesterUpdatedDate: { type: Date },
    activeStatus: {
      type: String,
      default: "active",
    },
  },
  { versionKey: false }
);

const SemesterModel = mongoose.model("semesters", DataSchema);

module.exports = SemesterModel;
