const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    VideoGroupID: { type: String, required: true, unique: true },
    videos: [
      {
        title: {
          en: { type: String },
          bn: { type: String },
        },
        link: { type: String },
        qaformid: [{ type: String }],
        resourcelink: { type: String },
      },
    ],
    courseID: { type: String },
    createdDate: { type: Date },
    updatedDate: { type: Date },
    activeStatus: { type: String, required: true, default: "active" },
  },
  { versionKey: false }
);

const videoModel = mongoose.model("videos", DataSchema);

module.exports = videoModel;

// [
//   {
//     "title": {
//       "en": "",
//       "bn": ""
//     },
//     "link": "",
//     "qaformid": [""],
//     "resourcelink":""
//   },
//   {
//     "title": {
//       "en": "",
//       "bn": ""
//     },
//     "link": "",
//     "qaformid": [""],
//     "resourcelink":""
//   }
// ]
[{"title":{"en":"","bn":""},"link":"","qaformid":[""],"resourcelink":"","_id":"65844333f143762656dfc945"},{"title":{"en":"","bn":""},"link":"","qaformid":[""],"resourcelink":"","_id":"65844333f143762656dfc946"}]