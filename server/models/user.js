const {Schema, model} = require("mongoose")


//defining schema that will map to the database collection for database collection
const userSchema = new Schema({
    username: {
        type:String,
        required: true,
        default: "user"
    },
    password: {
        type: String,
        required: true,
        default: "fireeye123"
    },
    date:{
        type: Date,
        default: Date.now
    }
})


const User = model("user", userSchema)

module.exports = User