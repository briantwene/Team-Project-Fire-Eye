"use strict"
const { Router } = require("express")
// create express router 
const express = require("express")
const { updatePass } = require("../controllers/passController")
const router = express.Router()

//get route for fetching user details 
router.get("/details")

//post route for getting the password
router.post("/pass")

//route for changing the password
router.post("/update", updatePass)

//export the routes to index.js
module.exports = router;