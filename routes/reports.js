const express = require("express");
const router = express.Router();
const ReportsController = require("../controllers/ReportsController");
const { checkAuthorization } = require("../controllers/AuthController");

router.get("/:user_id", checkAuthorization, ReportsController.generateReport);

module.exports = router;
