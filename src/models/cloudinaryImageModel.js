const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    imageLink: {
      public_id: { type: String },
      url: { type: String },
    },

    imageName: { type: String },
    status: {
      type: String,
    },
    imageCreatedDate: { type: Date },
    imageUpdatedDate: { type: Date },
  },
  { versionKey: false }
);

const cloudinaryImageModel = mongoose.model("images", DataSchema);

module.exports = cloudinaryImageModel;
