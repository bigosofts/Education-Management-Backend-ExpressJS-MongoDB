const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
    aboutImageLink:{
        type: String, 
        required: true
    },
    aboutTitle:{
        en:{
            type:String,
            required: true
        },
        bn:{
            type:String,
            required: true
        }
    },
    aboutDescription: {
        en:{
            type:String,
            required: true
        },
        bn:{
            type:String,
            required: true
        }
    },
    aboutCreatedDate:{type:Date},
    aboutUpdatedDate:{type:Date},
    activeStatus:{
        type: String,
        required: true,
    }

},{versionKey: false});

const aboutModel = mongoose.model("abouts",DataSchema);

module.exports = aboutModel;