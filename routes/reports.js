const express = require("express");
const router = express.Router();
const ReportsController = require("../controllers/ReportsController");

router.get("/:user_id", ReportsController.generateReport);

module.exports = router;
