const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
   RichTextName: {
    type: String, 
    required: true,
    unique: true
    },
   TextPayload:{type: String},
   activeStatus:{
      type: String,
      required: true,
  }

},{versionKey: false});

const RichTextModel = mongoose.model("richtexts",DataSchema);

module.exports = RichTextModel;