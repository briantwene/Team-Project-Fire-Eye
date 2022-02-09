const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { createTokens } = require("../middleware/jwt");

exports.auth = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (err, user) => {
    //if user doesnt exist or there is an error then send error message
    if (!user) {
      res.status(400).json({ message: "user doesnt exist" });
    } else {
      //see if can be made into a promise....
      //otherwise compare the password with that in the database
      bcrypt.compare(password, user.password).then((isMatch) => {
        //if there is a match
        if (isMatch) {
          //create the JWT for the user
          const accessToken = createTokens(user);

          //store the JWT as a cookie that will expire in an hour
          res.cookie("access-token", accessToken, {
            maxAge: 60 * 1000,
            httpOnly: true,
          });
          //tell the user that they are logged in
          res.json("LOGGED IN");
          //otherwise return an error message to the front end
        } else {
          return res.status(400).json({ message: "Wrong username/password" });
        }
      });
    }

    console.log(req.query);
  });
};
