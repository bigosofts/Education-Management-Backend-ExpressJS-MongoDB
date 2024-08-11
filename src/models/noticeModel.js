const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
    noticeId: {type:String, required: true, unique:true},
    noticeTitle: {
        en:{type:String,required: true},
        bn:{type:String,required: true}
    },
    noticeCreatedDate: {type: Date},
    noticeUpdatedDate: {type: Date},
    noticeIcon: {type: String, required: true},
    noticeLink: {type: String, required: true},
    activeStatus:{
        type: String,
        required: true,
    }
},{versionKey: false});

const noticeModel = mongoose.model("notices",DataSchema);

module.exports = noticeModel;