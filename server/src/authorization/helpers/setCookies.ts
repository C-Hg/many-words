import { Response } from "express";

import {
  REFRESH_TOKEN_EXPIRATION,
  WEB_ACCESS_TOKEN_EXPIRATION,
} from "../constants";

export enum Cookies {
  accessToken = "accessToken",
  refreshToken = "refreshToken",
}

const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
): void => {
  res.cookie(Cookies.accessToken, accessToken, {
    domain:
      process.env.NODE_ENV === "production" ? "manywords.org" : "localhost",
    expires: new Date(Date.now() + WEB_ACCESS_TOKEN_EXPIRATION), // cookie will be removed after 6 months
    httpOnly: true,
    sameSite: "strict",
    secure: true, // TODO: check if it works on staging server
    signed: true,
  });
  res.cookie(Cookies.refreshToken, refreshToken, {
    domain:
      process.env.NODE_ENV === "production" ? "manywords.org" : "localhost",
    expires: new Date(Date.now() + REFRESH_TOKEN_EXPIRATION), // cookie will be removed after 6 months
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    signed: true,
  });
};

export default setCookies;
