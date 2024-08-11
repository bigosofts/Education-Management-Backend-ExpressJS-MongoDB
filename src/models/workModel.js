const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    sid: {
      type: String,
    },
    name: {
      type: String,
    },
    img: {
      type: String,
    },
    jamat: {
      type: String,
    },
    createdDate: { type: Date },
    updateDate: { type: Date },
    activeStatus: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const workModel = mongoose.model("works", DataSchema);

module.exports = workModel;
