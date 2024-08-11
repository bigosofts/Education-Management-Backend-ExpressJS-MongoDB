const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    departmentID: { type: String, required: true, unique: true },
    departmentName: { type: String, required: true },
    jamats: [],
    departmentCreatedDate: { type: Date },
    departmentUpdatedDate: { type: Date },
    activeStatus: {
      type: String,
      default: "active",
    },
  },
  { versionKey: false }
);

const DepartmentModel = mongoose.model("departments", DataSchema);

module.exports = DepartmentModel;
