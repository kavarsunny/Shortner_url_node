const express = require("express");
const URL = require("../models/url");
const router = express.Router();

// Home page – accessible only to logged-in users
router.get("/", async (req, res) => {
  if (!req.user) {
    return res.redirect("/user/login");
  }
  try {
    // Optionally, show only URLs created by the logged-in user
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", { urls: allUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error");
  }
});

// Signup page – redirect to home if already logged in
router.get("/user/signup", (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("signup");
});

// Login page – redirect to home if already logged in
router.get("/user/login", (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("login");
});

module.exports = router;
