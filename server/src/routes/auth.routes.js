import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import sendUserDetails from "../auth/session/sendUserDetails.controller";
import logoutUser from "../auth/session/logoutUser.controller";
import deleteUserAccount from "../auth/account/deleteUserAccount.controller";
import passportStrategies from "../auth/passport";

const router = express.Router();
// importing passport strategies
passportStrategies();

router.get(
  "/google/token",
  passport.authenticate("google-token"),
  (req, res) => {
    res.send(req.user);
  }
);

router.get("/session", sendUserDetails);
router.get("/logout", logoutUser);
router.get("/delete_user", bodyParser.json(), deleteUserAccount);

export default router;
