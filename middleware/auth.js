const { getUser } = require("../service/auth");

function restrictToLoggedinUserOnly(req, res, next) {
  // Check for token in cookies
  const token = req.cookies?.uid;
  if (!token) {
    return res.redirect("/user/login");
  }
  const user = getUser(token);
  if (!user) {
    return res.redirect("/user/login");
  }
  req.user = user;
  next();
}

function checkAuth(req, res, next) {
  // Check for token in cookies; alternatively, you can check the Authorization header.
  const token = req.cookies?.uid || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);
  req.user = token ? getUser(token) : null;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
