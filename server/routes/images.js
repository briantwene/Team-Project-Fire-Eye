"use strict"
const express = require("express");
const { fetchImages, deleteImage } = require("../controllers/imageController");
const router = express.Router()


//routes for fetching the images from the storage
//fetching images from the gallery
router.get("/images", fetchImages)

//route for deleting image from the NAS
router.post("/delete", deleteImage)


module.exports = router;