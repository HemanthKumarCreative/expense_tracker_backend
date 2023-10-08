const express = require("express");
const router = express.Router();
const ReportDownloadsController = require("../controllers/DownloadController");
const { checkAuthorization } = require("../controllers/AuthController");

router.post(
  "/:user_id",
  checkAuthorization,
  ReportDownloadsController.createDownloadRecord
);
router.get(
  "/:user_id",
  checkAuthorization,
  ReportDownloadsController.getAllDownloadsRecord
);

module.exports = router;
