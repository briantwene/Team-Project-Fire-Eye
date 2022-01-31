const User = require("../models/user")



exports.loginUser = async(username, password) => {
    const newUser = new User({username, password})
    const result = await newUser.save()
    console.log(`login completed ${result}`)
}


