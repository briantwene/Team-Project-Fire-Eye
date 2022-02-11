"use strict";

const express = require("express");
const router = express.Router();

const { auth, logout } = require("../controllers/loginController");

//route for user login
router.post("/user", auth);
router.post("/logout", logout);

module.exports = router;
