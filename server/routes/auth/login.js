"use strict"
const express = require("express")
const {updateLogin} = require("../../controllers/loginController")

const router = express.Router()

//route for user login
router.get("/login", updateLogin )

module.exports = router