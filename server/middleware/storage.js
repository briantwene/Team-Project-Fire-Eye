const multer = require("multer");

//tells multer how to deal with files that are uploaded
const fileStorageEngine = multer.diskStorage({
  //telling multer where to save the images
  destination: (req, file, cb) => {
    cb(null, "//172.20.10.6/nas/uploads");
  },
  //telling multer what to call the filename
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//export the storageEngine
module.exports = { fileStorageEngine };
