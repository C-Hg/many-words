import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import sendUserDetails from "../auth/session/sendUserDetails.controller";
import logoutUser from "../auth/session/logoutUser.controller";
import deleteUserAccount from "../auth/account/deleteUserAccount.controller";

const router = express.Router();
require("../auth/passport")(); // importing passport strategies with iife

router.get("/google/token", passport.authenticate("google-token"), function(
  req,
  res
) {
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
