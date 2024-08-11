const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
   user: {type: String, required: true},
   message: {type: String, required: true},
   date:{type: Date, required: true} 
},{versionKey: false});

const logModel = mongoose.model("logs",DataSchema);

module.exports = logModel;