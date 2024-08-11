const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    menuTitle: {
      en: { type: String, required: true },
      bn: { type: String, required: true },
    },
    menuLink: { type: String, required: true },
    menuIcon: { type: String, required: true },
    menuType: { type: String, required: true },
    activeStatus: {
      type: String,
      required: true,
    },
    subMenu: { type: Object, required: true },
  },
  { versionKey: false }
);

const menuModel = mongoose.model("menus", DataSchema);

module.exports = menuModel;


