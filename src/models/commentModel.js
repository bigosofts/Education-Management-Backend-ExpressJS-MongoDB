const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
    commentId:{type: String, required: true, unique: true},
    userName:{
        en:{
            type:String,
            required: true
        },
        bn:{
            type:String,
            required: true
        }
    },
    designation:{
        en:{
            type:String,
            required: true
        },
        bn:{
            type:String,
            required: true
        }
    },
    comment: {
        en:{
            type:String,
            required: true
        },
        bn:{
            type:String,
            required: true
        }
    },
    commentCreatedDate:{type:Date},
    commentUpdatedDate:{type:Date},
    commentIcon: {type:String,required: true},
    activeStatus:{
        type: String,
        required: true,
    }

},{versionKey: false});

const commentModel = mongoose.model("comments",DataSchema);

module.exports = commentModel;