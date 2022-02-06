"use strict"
const User = require("../models/user");
const bcrypt = require("bcryptjs")


exports.updatePass = async(req, res) => {
    const {username, password} = req.query;

    User.findOne({username: username}, async(err, user) =>{
        //get the user Info from the databaser
        if(err){
            return res.status(400).json({error: "An error has occured"})
        }

        //then compare the passwords to see if they are the same
       const isSame = await bcrypt.compare(password, user.password).catch(e => {console.log(`there was an error ${e}`);})
       
       //if it is the same then return an error
       if (isSame){
           return res.status(400).json({error: "the passwords are the same"})
       } else{
           //otherwise hash the new password and update user in db
           const hashed = await bcrypt.hash(password, 12)
           user.password = hashed;
           user.save()
           //send success message
           return res.status(200).json({success: "password has been updated"})
       }

    })
}