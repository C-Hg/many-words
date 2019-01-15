const express = require("express");
const router = express.Router();
const passport = require("passport");

require("../auth/passport")(); //importing passport strategies with iife

router.get("/google/token", passport.authenticate("google-token"), function(
  req,
  res
) {
  res.send(req.user);
});

module.exports = router;
