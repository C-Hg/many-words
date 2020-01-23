import { Request, Response } from "express";

// session continues but the user is logged out i.e the session cookie contains no user ID

const logoutUser = (req: Request, res: Response): void => {
  if (req.user) {
    req.logout();
    req.session.destroy(error => {
      if (error) {
        console.error("[logoutUser] error while destroying session", error);
      }
    });
    res.status(200).send("user logged out");
  } else {
    res.status(401).send("no active session");
  }
};

export default logoutUser;
