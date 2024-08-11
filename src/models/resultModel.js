const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    resultRollNo: {
      type: Number,
      required: true,
    },
    resultRegNo: {
      type: Number,
      required: true,
    },
    studentUserId: {
      type: String,
      required: true,
    },
    studentExamMadrasha: {
      type: String,
      required: true,
    },
    studentExamCentre: {
      type: String,
      required: true,
    },
    studentSubMark: [],
    studentGrade: {
      type: String,
      required: true,
    },
    studentMerit: {
      type: Number,
      required: true,
    },
    activeStatus: {
      type: String,
      required: true,
    },
    passingYear: { type: Number },
    picture: { type: String },
    marhala: { type: String },
  },
  { versionKey: false }
);

const resultModel = mongoose.model("results", DataSchema);

module.exports = resultModel;
