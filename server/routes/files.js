const { Router } = require("express");
//import from herer
const { requestFolder, requestBaseFile } = require("../controllers/fileController");

const router = Router();
// route: nas/....
router.get("/gather", requestFolder);

router.get("/upload");

router.get("/download");

router.post("/delete");

router.post("/folder");

module.exports = router;
