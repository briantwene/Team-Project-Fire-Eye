const { sign, verify } = require("jsonwebtoken");
const User = require("../models/user");

//function to create a JWT
const createTokens = (user) => {
  //need to create one that expires
  const accessToken = sign({ username: user.username, id: user.id }, "secret-need to change for later");

  return accessToken;
};

//token validation middleware function
validateToken = (req, res, next) => {
  //get the token from the cookie store
  const accessToken = req.cookies["access-token"];
  //if the token isnt there then send an error
  if (!accessToken) return res.status(400).json({ error: "User not Authenticated" });

  //try....
  try {
    //checking if the cookie is valid
    const validToken = verify(accessToken, "secret-need to change for later");
    //and if it is
    if (validToken) {
      //then set the authenticated header to true
      req.authenticated = true;
      return next();
    }
    //if there are any errors then let the frontend know
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
