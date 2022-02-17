const { Router } = require("express");
const multer = require("multer");
//import from herer
const { requestFolder, requestEntryPoint, removeFile, createFile, createFolder, deleteFolder, downloadAny, requestStats } = require("../controllers/fileController");

const { fileUpload } = require("../controllers/loadController");
const { fileStorageEngine } = require("../middleware/storage");
const { getFileStats } = require("../services/access");
const router = Router();

const upload = multer({ storage: fileStorageEngine });

router.get("/storeinfo", requestStats);

// route: nas/....
router.get("/gather", requestEntryPoint);

router.get("/changeDir", requestFolder);

//for image upload pass the multer middleware and set the limit of files to 10
router.post("/upload", upload.single("file"), fileUpload);

router.get("/download", downloadAny);

router.post("/delete", removeFile);

router.post("/folder", createFolder);

router.post("/folderDelete", deleteFolder);

module.exports = router;
