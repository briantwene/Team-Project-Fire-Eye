const { collectImages } = require("../services/access")

//controller for fetching images
exports.fetchImages = async(req, res) => {
    const images = await collectImages()
    console.log(images);
    res.send(images)
}