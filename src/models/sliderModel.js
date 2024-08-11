const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    sliderImageLink: { type: String, required: true },
    sliderName: { type: String, default: "home" },
    sliderId: { type: String, required: true, unique: true },
    sliderTitle: {
      en: { type: String, required: true },
      bn: { type: String, required: true },
    },
    sliderDescription: {
      en: { type: String, required: true },
      bn: { type: String, required: true },
    },
    sliderButtonTitle: {
      en: { type: String, required: true },
      bn: { type: String, required: true },
    },
    sliderButtonLink: { type: String, required: true },
    activeStatus: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const sliderModel = mongoose.model("sliders", DataSchema);

module.exports = sliderModel;
