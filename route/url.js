const express = require("express");
const { handleGenerateUrl, handleAnalysis } = require("../controller/url");
const router = express.Router();

// Route to generate a short URL
router.post("/", handleGenerateUrl);

// Route to get URL analysis
router.get("/analysis/:shortId", handleAnalysis);

module.exports = router;
