import jwt from "jsonwebtoken";

import verifyToken from "./verifyToken";

import CONFIG from "../../config/secrets";
import { ACCESS_TOKEN_EXPIRATION } from "../constants";
import { TokenTypes } from "../interfaces/tokenPayload.interface";

// Successful verification of token is tested in signToken.test.ts

describe("verifyToken", () => {
  it("should throw an error for wrong issuer", async () => {
    const exp = Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRATION;
    const payload = {
      iss: "wrongIss",
      exp,
      sub: "aRandomSub",
      tokenUse: TokenTypes.access,
    };
    const token = jwt.sign(payload, CONFIG.jwtSignature);
    await expect(verifyToken(token)).rejects.toThrowError("jwt issuer invalid");
  });

  it("should throw a token expired error", async () => {
    const exp = Math.floor(Date.now() / 1000) - 10;
    const payload = {
      iss: "wrongIss",
      exp,
      sub: "aRandomSub",
      tokenUse: TokenTypes.access,
    };
    const token = jwt.sign(payload, CONFIG.jwtSignature);
    await expect(verifyToken(token)).rejects.toThrowError("jwt expired");
  });
});
