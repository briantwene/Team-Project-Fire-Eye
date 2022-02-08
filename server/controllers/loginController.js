const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.auth = (req, res, next) => {
  //use the local strategy to autheticate the user
  //if there are errors the return them
  //otherwise let the user log in
  // passport.authenticate("local", (err, user, info) => {
  //   if (err) {
  //     return res.status(400).json({ errors: err });
  //   }
  //   if (!user) {
  //     return res.status(400).json({ errors: "No user found" });
  //   }
  //   req.logIn(user, function (err) {
  //     if (err) {
  //       return res.status(400).json({ errors: err });
  //     }
  //     return res.status(200).json({ success: `logged in ${user.id}` });
  //   });
  // })(req, res, next);

  const { username, password } = req.body;

  User.findOne({ username: username }, (err, user) => {
    //if user doesnt exist or there is an error then send error message
    if (err) {
      return done(err);
    } else if (!user) {
      return res.send({ message: "Wrong username/password" });
    } else {
      //otherwise compare the password with that in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          req.session.user = user;
          console.log(req.session.user);
        } else {
          return res.send({ message: "Wrong username/password" });
        }
      });
    }
  });

  console.log(req.body);
};
