const mongoose = require("mongoose");

const DataSchema= mongoose.Schema({
    eventId: {type: String, required: true, unique: true},
    eventTitle: {
        en:{type:String,required: true},
        bn:{type:String,required: true}
    },
    eventCreatedDate: {type: Date},
    eventUpdatedDate: {type: Date},
    eventUpcomingDate: {
        en:{type:Date,required: true},
        bn:{type:String,required: true}       
    },
    eventIcon: {type: String, required: true},
    eventLink: {type: String, required: true},
    eventImageLink: {type: String, required: true},
    activeStatus:{
        type: String,
        required: true,
    }
},{versionKey: false});

const eventModel = mongoose.model("events",DataSchema);

module.exports = eventModel;