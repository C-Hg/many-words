import { Response } from "express";

const error401 = (res: Response): void => {
  res.status(401).json({ error: "Unauthenticated" }).end();
};

export default error401;
