import { Response } from "express";

import { WEB_ACCESS_TOKEN_EXPIRATION } from "../constants";

export enum Cookies {
  accessToken = "accessToken",
  refreshToken = "refreshToken",
}

const setAccessTokenCookie = (res: Response, accessToken: string): void => {
  res.cookie(Cookies.accessToken, accessToken, {
    domain: process.env.NODE_ENV === "production" ? "manywords.org" : undefined,
    expires: new Date(Date.now() + WEB_ACCESS_TOKEN_EXPIRATION), // cookie will be removed after 6 months
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    signed: true,
  });
};

export default setAccessTokenCookie;
