const {Schema, model} = require("mongoose");

//database models for the photos table
const footageSchema = new Schema({
    photo:{
        type: String,
    },
    path:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

//create the model from the schema and export for use in other files
const photos = new model("photos", footageSchema);
module.exports = photos