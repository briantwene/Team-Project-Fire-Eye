//import the needed modules and schema
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");
const LocaLStrategy = require("passport-local").Strategy;
const { deleteOne } = require("../models/user");

//for dealing with sessions
passport.serializeUser((user, done) => {
  deleteOne(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

//Local strategy for authentication....
passport.use(
  new LocaLStrategy(function (username, password, done) {
    User.findOne({ username: username }, (err, user) => {
      //if user doesnt exist or there is an error then send error message
      if (err) {
        return done(err);
      } else if (!user) {
        return done(null, false, { message: "User not found" });
      } else {
        //otherwise compare the password with that in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Wrong password" });
          }
        });
      }
    });
  })
);

module.exports = passport;
