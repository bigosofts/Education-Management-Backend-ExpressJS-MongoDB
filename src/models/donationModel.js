const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    donationID: { type: String, unique: true, required: true },
    donationTargetAmount: { type: String },
    donationArea: { type: String },
    donationAmount: { type: Number },
    donationPaymentWay: { type: String },
    donationTransactionID: { type: String },
    donationSenderAccount: { type: String },
    donationRepeatTime: { type: String },
    nextDonationTime: { type: String },
    donationCreatedDate: { type: Date },
    donationUpdatedDate: { type: Date },
    activeStatus: { type: Date },
  },
  { versionKey: false }
);

const donationModel = mongoose.model("donations", DataSchema);

module.exports = donationModel;
