const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    userRole: { type: String, required: true },
    firstName: {
      en: { type: String },
      bn: { type: String },
    },
    lastName: {
      en: { type: String },
      bn: { type: String },
    },
    nidNumber: { type: Number },
    birthRegNumber: { type: Number },
    fatherName: {
      en: { type: String },
      bn: { type: String },
    },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String },
    mobileNumber: { type: String, required: true },
    teacherCourseCode: [],
    teacherJamatCode: [],
    gender: { type: String },
    dateOfBirth: { type: Date },
    countryName: { type: String },
    fullPresentAddress: { type: String },
    fullPermanentAddress: { type: String },
    educationalBackground: { type: String },
    activeStatus: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
    createdData: { type: Date },
    updatedData: { type: Date },
    designation: { type: String },
    details: { type: Object, required: true },
  },
  { versionKey: false }
);

const teacherProfileModel = mongoose.model("teachers", DataSchema);

module.exports = teacherProfileModel;
