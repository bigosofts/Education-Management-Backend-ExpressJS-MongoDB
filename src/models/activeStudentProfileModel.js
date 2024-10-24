const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    userName: { type: String },
    batchCount: { type: String },
    details: { type: Object },
    userRole: { type: String },
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
    emailAddress: { type: String},
    password: { type: String },
    mobileNumber: { type: String },
    occupation: { type: String },
    extracurricular: { type: String },
    studentCourseCode: [
      {
        code: { type: String },
        startedDate: { type: Date },
        endDate: { type: Date },
        status: { type: String },
      },
    ],
    studentDepartment: [
      {
        code: { type: String },
        startedDate: { type: Date },
        endDate: { type: Date },
        status: { type: String },
      },
    ],
    studentJamatCode: [
      {
        code: { type: String },
        startedDate: { type: Date },
        endDate: { type: Date },
        status: { type: String },
      },
    ],
    studentSemester: [
      {
        code: { type: String },
        startedDate: { type: Date },
        endDate: { type: Date },
        status: { type: String },
      },
    ],
    gender: { type: String },
    dateOfBirth: { type: String },
    countryName: { type: String },
    fullPresentAddress: { type: String },
    fullPermanentAddress: { type: String },
    admissionDate: { type: Date },
    admissionSession: { type: String },
    studentMotive: { type: String },
    paymentStatus: {
      addmissionDueStatus: { type: Boolean },
      consequentDueStatus: { type: Boolean },
      paymentID: { type: String },
    },
    activeStatus: {
      type: String,
    },
    isAdmin: { type: Boolean, default: false },
    fundStatus: { type: String },
    accountStatus: {
      status: { type: String },
      date: { type: Date },
    },
  },
  { versionKey: false }
);

const studentProfileActiveModel = mongoose.model("activestudents", DataSchema);

module.exports = studentProfileActiveModel;
