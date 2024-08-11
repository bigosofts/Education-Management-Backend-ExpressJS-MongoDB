const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
    activityId:{type: String, required: true, unique:true},
    activityImageLink:{
        type:String,
        required:true
    },
    activityTitle:{
        en:{
            type:String,
            required: true
        },
        bn:{
            type:String,
            required: true
        }
    },
    activityDescription: {
        en:{
            type:String,
            required: true
        },
        bn:{
            type:String,
            required: true
        }
    },
    activityCreatedDate:{type:Date},
    activityUpdatedDate:{type:Date},
    activityIcon:{type: String, required: true},
    activeStatus:{
        type: String,
        required: true,
    }

},{versionKey: false});

const activityModel = mongoose.model("activities",DataSchema);

module.exports = activityModel;