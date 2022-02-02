const User = require("../models/user")



exports.loginUser = async(username, password) => {
   //check if the user exists in the database
    User.findOne({username: username}, (err, result) => {
        if(err){
            console.log(`something went wrong with the query ${err}`)
            console.log("user doesnt exist");
        }
        
        console.log(result);
        
        if(password === result.password){
            console.log("LETSSSSSSSSSSSSSSSSSSSSSSSGGGGGGGGGGGGGGGGGGOOOOOOOOOOOOOOOOOOOOO")
        }else{
            console.log("nah bro");
        }

        
    })

   //if they exist check if the password is right
   //if its right let the user pass
    
}




