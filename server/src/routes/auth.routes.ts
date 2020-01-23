import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import logoutUser from "../user/account/logoutUser.controller";
import deleteUserAccount from "../user/account/deleteUserAccount.controller";
import passportStrategies from "../middlewares/passport";
import userController from "../user/user.controller";

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

router.get("/session", userController.getUser);
router.get("/logout", logoutUser);
router.get("/delete_user", bodyParser.json(), deleteUserAccount);

export default router;
