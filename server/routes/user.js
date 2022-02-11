"use strict";
const { Router } = require("express");

// create express router

const { updatePass } = require("../controllers/passController");
const { validateToken } = require("../middleware/jwt");

const router = Router();

//get route for fetching user details
router.get("/details");

router.get("/isauth", validateToken, (req, res) => {
  res.send({ success: "valid" });
});

//post route for getting the password
router.post("/pass");

//route for changing the password
router.post("/update", validateToken, updatePass);

//export the routes to index.js
module.exports = router;
