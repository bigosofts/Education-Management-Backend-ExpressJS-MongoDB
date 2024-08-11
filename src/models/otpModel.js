const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: {
      type: Number,
      required: true,
    },
    createdDate: { type: Date },
    status: {
      type: String,
    },
  },
  { versionKey: false }
);

const otpModel = mongoose.model("otps", DataSchema);

module.exports = otpModel;
