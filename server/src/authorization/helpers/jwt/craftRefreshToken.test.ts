import craftRefreshToken from "./craftRefreshToken";
import verifyToken from "./verifyToken";

import { REFRESH_TOKEN_EXPIRATION } from "../../constants";

describe("craftRefreshToken", () => {
  it("should craft a refresh token and verify it", async () => {
    const refreshToken = await craftRefreshToken("someId");
    const verifiedToken = await verifyToken(refreshToken);
    expect(verifiedToken.exp).toBeCloseTo(
      Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION,
      -3
    );
    expect(verifiedToken.iat).toBeDefined();
    expect(verifiedToken.tokenUse).toEqual("refresh");
    expect(verifiedToken.sub).toEqual("someId");
  });
});
