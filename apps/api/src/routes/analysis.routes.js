const express = require("express");

const { runAnalysis } = require("../controllers/analysis.controller");

const {
  validateAnalysisRequest,
} = require("../middleware/validateRequest");

const router = express.Router();

router.post("/", validateAnalysisRequest, runAnalysis);

module.exports = router;