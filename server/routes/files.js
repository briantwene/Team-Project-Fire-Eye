const { Router } = require("express");
//import from herer
const { requestFolder, requestBaseFile, removeFile, createFile, createFolder, deleteFolder, downloadAny } = require("../controllers/fileController");

const router = Router();
// route: nas/....
router.get("/gather", requestFolder);

router.get("/upload");

router.get("/download",downloadAny);

router.post("/delete", removeFile);

router.post("/folder",createFolder);

router.post("/folderDelete", deleteFolder);

module.exports = router;
