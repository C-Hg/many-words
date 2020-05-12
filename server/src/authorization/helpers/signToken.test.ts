import signToken from "./signToken";
import verifyToken from "./verifyToken";

import logger from "../../utils/logger";
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
} from "../constants";
import { TokenTypes } from "../interfaces/tokenPayload.interface";

describe("signToken", () => {
  it("should sign an access token", async () => {
    const exp = Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRATION;
    const payload = {
      exp,
      sub: "aRandomIdString",
      tokenUse: TokenTypes.access,
    };
    const accessToken = await signToken(payload);
    const decodedToken = await verifyToken(accessToken);
    expect(decodedToken.exp).toEqual(exp);
    expect(decodedToken.iat).toBeDefined();
    expect(decodedToken.tokenUse).toEqual("access");
    expect(decodedToken.sub).toEqual("aRandomIdString");
  });

  it("should sign a refresh token", async () => {
    const exp = Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION;
    const payload = {
      exp,
      sub: "aRandomIdString",
      tokenUse: TokenTypes.refresh,
    };

    const refreshToken = await signToken(payload);
    const decodedToken = await verifyToken(refreshToken);
    expect(decodedToken.exp).toEqual(exp);
    expect(decodedToken.iat).toBeDefined();
    expect(decodedToken.tokenUse).toEqual("refresh");
    expect(decodedToken.sub).toEqual("aRandomIdString");
  });
});
