import { Response } from "express";

import { WEB_ACCESS_TOKEN_EXPIRATION } from "../constants";

const setAccessCookie = (res: Response, accessToken: string) => {
  res.cookie("access_token", accessToken, {
    expires: new Date(Date.now() + WEB_ACCESS_TOKEN_EXPIRATION), // cookie will be removed after 6 months
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // TODO: check if it works on staging server
  });
};

export default setAccessCookie;
