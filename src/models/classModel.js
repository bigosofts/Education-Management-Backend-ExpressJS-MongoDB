const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    classID: { type: String, unique: true, required: true },
    batchNo: { type: String },
    maleClassLink: { type: String },
    femaleClassLink: { type: String },
    courseID: { type: String },
    departmentID: { type: String },
    jamatID: { type: String },
    semesterID: { type: String },
    bookID: { type: String },
    teacher: {
      TID: { type: String },
      tName: { type: String },
      mobileNumber: { type: String },
      attendance: [
        {
          month: { type: String },
          dayName: { type: String },
          dayNumber: { type: String },
          presentTime: { type: String },
          enterTime: { type: String },
          exitTime: { type: String },
          isPresent: { type: Boolean },
          completionProgress: [
            {
              questionNo: { type: String },
              question: { type: String },
              multipleChoice: {
                choice1: { type: String },
                choice2: { type: String },
                choice3: { type: String },
                answer: { type: String },
              },
            },
          ],
        },
      ],
    },
    examQuestion: [
      {
        examQuestion: { type: String },
        examType: { type: String },
        startedDate: { type: String },
      },
    ],
    students: [
      {
        SID: { type: String },
        sName: { type: String },
        mobileNumber: { type: String },
        attendance: [
          {
            month: { type: String },
            dayName: { type: String },
            dayNumber: { type: String },
            presentTime: { type: String },
            isPresent: { type: Boolean },
            completionProgress: [
              {
                mark: { type: Number },
                answer: { type: String },
                question: { type: String },
              },
            ],
          },
        ],
        examSheet: [
          {
            examID: { type: String },
            examSheet: { type: String },
            examType: { type: String },
            submittedDate: { type: String },
          },
        ],
      },
    ],

    classStartTime: { type: String },
    classEndTime: { type: String },
    createdDate: { type: Date },
    updatedDate: { type: Date },
    activeStatus: { type: String },
  },
  { versionKey: false }
);

const classModel = mongoose.model("classes", DataSchema);

module.exports = classModel;
