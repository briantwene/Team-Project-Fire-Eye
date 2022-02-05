const express = require("express");
const { fetchImages } = require("../controllers/imageController");
const router = express.Router()


//routes for fetching the images from the storage
//fetching images from the gallery
router.get("/images", fetchImages)


module.exports = router;