const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  try {
    await User.create({ name, email, password });
    return res.redirect("/user/login");
  } catch (error) {
    console.error("Signup error:", error);
    return res.render("signup", { error: "Signup failed. Try a different email." });
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.render("login", { error: "Invalid email or password." });
    }
    // Generate a JWT token for the user
    const token = setUser(user);
    // Set the token in an HTTP-only cookie
    res.cookie("uid", token, { httpOnly: true });
    return res.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    return res.render("login", { error: "Login failed. Please try again." });
  }
}

function handleUserLogout(req, res) {
  res.clearCookie("uid");
  return res.redirect("/user/login");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
};
