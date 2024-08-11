const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    qaformid: { type: String, required: true, unique: true },
    questionimage: { type: String },
    questiontext: { type: String },
    multiplechoice: {
      choiceone: { type: String },
      choicetwo: { type: String },
      choicethree: { type: String },
      choicefour: { type: String },
    },

    correctanswer: { type: String },
    createdDate: { type: Date },
    updatedDate: { type: Date },
    activeStatus: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const qaFormModel = mongoose.model("qaforms", DataSchema);

module.exports = qaFormModel;
