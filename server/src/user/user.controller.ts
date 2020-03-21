import { Request, Response } from "express";

const userController = {
  getUser: (req: Request, res: Response): void => {
    if (req.user) {
      res.status(200).send(req.user.stats);
    } else {
      res.status(200).send({ response: "user not connected" });
    }
  },
};

export default userController;
