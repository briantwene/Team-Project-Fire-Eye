"use strict";

const express = require("express");
const router = express.Router();

const { auth } = require("../controllers/loginController");

//route for user login
router.post("/user", auth);

module.exports = router;
