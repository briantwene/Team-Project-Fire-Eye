"use strict"
const {checkLogin} = require("../controllers/loginController")
const express = require("express")

const router = express.Router()

//route for user login
router.post("/user", checkLogin )

module.exports = router