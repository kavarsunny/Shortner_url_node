const jwt = require("jsonwebtoken");
const secret = "sunnny$3232";

function setUser(user) {
  // Create a token containing the user's _id and email.
  // Optionally, you can set an expiration (here set to 1 hour).
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret,
    { expiresIn: "1h" }
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
