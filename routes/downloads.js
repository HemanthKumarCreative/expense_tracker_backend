const express = require("express");
const router = express.Router();
const ReportDownloadsController = require("../controllers/DownloadController");

router.post("/:user_id", ReportDownloadsController.createDownloadRecord);
router.get("/:user_id", ReportDownloadsController.getAllDownloadsRecord);

module.exports = router;
