const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    paymentID: { type: String, required: true, unique: true },
    paymentCurrency: { type: String, required: true },
    admissionDate: { type: Date, required: true },
   
    admissionPrice: { type: Object, required: true },
    monthlyPaymentPrice: { type: Object, required: true },
    admissionPaymentHistory: [
      {
        Date: { type: Date },
        PaymentStatus: { type: Boolean },
        Price: { type: Number },
        currency: { type: String },
        transactionID: { type: String },
        senderNo: { type: String },
        paymentWay: { type: String },
        nextAdmissionDate: { type: Date },
      },
    ],
    monthlyPaymentHistory: [
      {
        Date: { type: Date },
        PaymentStatus: { type: Boolean },
        Price: { type: Number },
        currency: { type: String },
        transactionID: { type: String },
        senderNo: { type: String },
        paymentWay: { type: String },
        nextMonthlyDate: { type: Date },
      },
    ],
    paymentCreatedDate: { type: Date },
    paymentUpdatedDate: { type: Date },
    activeStatus: {
      type: String,
      default: "active",
    },
  },
  { versionKey: false }
);

const Payment = mongoose.model("payments", DataSchema);

module.exports = Payment;
