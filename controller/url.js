const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateUrl(req, res) {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }
  const shortID = shortid();
  try {
    const newUrl = await URL.create({
      shortId: shortID,
      redirectURL: url,
      visithistory: [],
      createdBy: req.user._id,
    });
    // After creation, redirect to home where the user sees their URLs
    return res.redirect("/");
  } catch (error) {
    console.error("Error generating URL:", error);
    return res.status(500).json({ error: "Failed to generate short URL" });
  }
}

async function handleAnalysis(req, res) {
  const { shortId } = req.params;
  try {
    const result = await URL.findOne({ shortId });
    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    return res.json({
      totalClicks: result.visithistory.length,
      analysis: result.visithistory,
    });
  } catch (error) {
    console.error("Error in analysis:", error);
    return res.status(500).json({ error: "Failed to analyze short URL" });
  }
}

module.exports = {
  handleGenerateUrl,
  handleAnalysis,
};
