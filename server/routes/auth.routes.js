const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const sendUserDetails = require("../auth/session/sendUserDetails.controller");
const logoutUser = require("../auth/session/logoutUser.controller");
const deleteUserAccount = require("../auth/account/deleteUserAccount.controller");

require("../auth/passport")(); //importing passport strategies with iife

router.get("/google/token", passport.authenticate("google-token"), function(
  req,
  res
) {
  console.log("before sending response :", req.user);
  res.send(req.user);
});

router.get("/facebook/token", passport.authenticate("facebook-token"), function(
  req,
  res
) {
  res.send(req.user);
});

router.get("/session", sendUserDetails);
router.get("/logout", logoutUser);
router.get("/delete_user", bodyParser.json(), deleteUserAccount);

module.exports = router;
