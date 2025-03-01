const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectTOMongoDB } = require("./connect");
const urlRoute = require("./route/url");
const staticRoute = require("./route/staticrouter");
const userRoute = require("./route/user");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middleware/auth");
const URL = require("./models/url");

const app = express();
const PORT = 8001;

// Connect to MongoDB with error handling
connectTOMongoDB("mongodb://localhost:27017/short-1")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use checkAuth middleware on all routes so that req.user is set (if available)
app.use(checkAuth);

// Static pages (login, signup, home) are handled in staticrouter.js
app.use("/", staticRoute);

// User routes (signup, login, logout)
app.use("/user", userRoute);

// Protected routes for URL generation and analysis (only logged-in users)
app.use("/url", restrictToLoggedinUserOnly, urlRoute);

// Public redirection route – when a short URL is visited, record the visit and redirect
app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visithistory: { timestamp: Date.now() } } },
      { new: true }
    );
    if (entry) {
      res.redirect(entry.redirectURL);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error("Error in redirect:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
