/* eslint-disable @typescript-eslint/unbound-method */
import { Request } from "express";

import verifyToken from "./jwt/verifyToken";
import { Cookies } from "./setCookies";

import logger from "../../utils/logger";
import { TokenPayload } from "../interfaces/tokenPayload.interface";

interface SignedCookies {
  [Cookies.refreshToken]: string;
}

function hasRefreshTokenCookies(
  signedCookies: Record<string, unknown> | SignedCookies
): signedCookies is SignedCookies {
  return Object.prototype.hasOwnProperty.call(
    signedCookies,
    Cookies.refreshToken
  );
}

const getRefreshToken = async (req: Request): Promise<TokenPayload | null> => {
  let verifiedToken: TokenPayload;
  let refreshToken;
  // extract the jwt from cookie or authorization header
  // const hasCookies = Object.keys(req.signedCookies).length > 0;
  if (hasRefreshTokenCookies(req.signedCookies)) {
    refreshToken = req.signedCookies[Cookies.refreshToken];
  }

  if (!refreshToken) {
    return null;
  }

  // verify the jwt
  try {
    verifiedToken = await verifyToken(refreshToken);
  } catch (error) {
    // allow expired token in dev mode only, with decodedToken
    logger.error(`[getRefreshToken] 401 - ${error}`);
    return null;
  }

  logger.debug(
    `[getRefreshToken] successfully parsed refresh token for user ${verifiedToken.sub}`
  );
  return verifiedToken;
};

export default getRefreshToken;
