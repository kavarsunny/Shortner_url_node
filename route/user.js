const express = require("express");
const { handleUserSignup, handleUserLogin, handleUserLogout } = require("../controller/user");
const router = express.Router();

// Route for user signup
router.post("/signup", handleUserSignup);

// Route for user login
router.post("/login", handleUserLogin);

// Route for user logout
router.get("/logout", handleUserLogout);

module.exports = router;
