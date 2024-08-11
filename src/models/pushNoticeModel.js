const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    subject: {
      en: { type: String },
      bn: { type: String },
    },
    text: {
      en: { type: String },
      bn: { type: String },
    },
    reciever: { type: String },
    sender: { type: String },
    link: { type: String },
    readStatus: { type: Boolean },
    createdDate: { type: Date },
    activeStatus: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const pushNoticeModel = mongoose.model("pushnotices", DataSchema);

module.exports = pushNoticeModel;
