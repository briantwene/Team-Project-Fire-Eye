const { Router } = require("express");
const multer = require("multer");
//import from herer
const { requestFolder, requestBaseFile } = require("../controllers/fileController");
const { fileUpload } = require("../controllers/loadController");
const { fileStorageEngine } = require("../middleware/storage");
const router = Router();

const upload = multer({ storage: fileStorageEngine });

// route: nas/....
router.get("/gather", requestFolder);

//for image upload pass the multer middleware and set the limit of files to 10
router.post("/upload", upload.array("files", 10), fileUpload);

router.get("/download");

router.post("/delete");

router.post("/folder");

module.exports = router;
