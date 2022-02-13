"use strict";
//const { collectImages } = require("../services/access")
const fs = require("fs/promises");
const folderPath = process.env.addr;

//controller for fetching images
exports.fetchImages = async (req, res) => {
  const images = await collectImages();
  console.log(images);
  res.send(images);
};

//controller for deleting image
exports.deleteImage = async (req, res) => {
  const { filename } = req.query;

  //delete the file from the folder
  await fs.unlink(`${folderPath}/${filename}`).catch((e) => {
    console.log(`an error has occured with deleting the image: ${e}`);
  });

  //if a success, then return a message
  return res.status(200).json({ success: "image has been deleted" });
};
