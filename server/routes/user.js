"use strict"
const { Router } = require("express")
// create express router 
const express = require("express")
const router = express.Router()

//get route for fetching user details 
router.get("/details")

//post route for getting the password
router.post("/pass")

//export the routes to index.js
module.exports = router;