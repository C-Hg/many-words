const express = require("express");
const router = express.Router();
const passport = require("passport");
const sendUserDetails = require("../auth/session/sendUserDetails.controller");
const logoutUser = require("../auth/session/logoutUser.controller");

require("../auth/passport")(); //importing passport strategies with iife

router.get("/google/token", passport.authenticate("google-token"), function(
  req,
  res
) {
  res.send(req.user);
});

router.get("/session", sendUserDetails);
router.get("/logout", logoutUser);

module.exports = router;
