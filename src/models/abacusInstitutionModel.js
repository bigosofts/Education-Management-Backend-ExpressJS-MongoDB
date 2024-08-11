const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    institutionID: { type: String, unique: true, required: true },
    institutionName: { type: String },
    principalName: { type: String },
    studentsNumber: { type: Number },
    directorPhone: { type: String },
    representativeName: { type: String },
    representativePhone: { type: String },
    institutionalEmail: { type: String },
    registrationFeeAmount: { type: Number },
    registrationPaymentWay: { type: String },
    paymentTransactionID: { type: String },
    paymentNumber: { type: String },
    abacusBookOrderlimit: { type: Number },
    abacusKitOrderlimit: { type: Number },
    password: { type: String },
    batchCount: { type: String },

    abacusCreatedDate: { type: Date },
    abacusUpdatedDate: { type: Date },
    activeStatus: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const abacusInstitutionModel = mongoose.model("abacusinstitutions", DataSchema);

module.exports = abacusInstitutionModel;
