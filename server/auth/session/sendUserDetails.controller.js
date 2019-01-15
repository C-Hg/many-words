const User = require("../../models/user.model");
const passport = require("passport");

module.exports = function sendUserDetails(req, res) {
  console.log(req.user, req.session);
  if (req.user) {
    res.send(req.user);
    return;
  } else res.send("no active session");
  //session is automatically regenerated
};
