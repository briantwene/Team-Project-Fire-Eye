const passport = require("passport");
const router = require("../routes/login");

exports.auth = (req, res, next) => {
  //use the local strategy to autheticate the user
  //if there are errors the return them
  //otherwise let the user log in
  passport.auth("local", (err, user, info) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ success: `logged in ${user.id}` });
    });
  })(req, res, next);
};
