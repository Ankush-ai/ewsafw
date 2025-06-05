const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const controller = require("../controllers/chapter.controller");
const adminAuth = require("../middleware/adminAuth");
const cache = require("../middleware/cache");

router.get("/", cache, controller.getChapters);
router.get("/:id", controller.getChapterById);
router.post("/", adminAuth, upload.single("file"), controller.uploadChapters);

module.exports = router;