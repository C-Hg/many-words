import craftAppAccessToken from "./craftAccessToken";
import verifyToken from "./verifyToken";

import {
  CLIENTS,
  APP_ACCESS_TOKEN_EXPIRATION,
  WEB_ACCESS_TOKEN_EXPIRATION,
} from "../../constants";

describe("craftAccessToken", () => {
  it("should craft a valid access token for app and user 5ed5fd2beb9cd4370490258e", async () => {
    const accessToken = await craftAppAccessToken(
      "5ed5fd2beb9cd4370490258e",
      CLIENTS.app
    );
    const verifiedToken = await verifyToken(accessToken);
    expect(verifiedToken.exp).toBeCloseTo(
      Math.floor(Date.now() / 1000) + APP_ACCESS_TOKEN_EXPIRATION,
      -3
    );
    expect(verifiedToken.iat).toBeDefined();
    expect(verifiedToken.tokenUse).toEqual("access");
    expect(verifiedToken.sub).toEqual("5ed5fd2beb9cd4370490258e");
  });

  it("should craft a valid access token for web and user 5ed5fd2beb9cd4370490258f", async () => {
    const accessToken = await craftAppAccessToken(
      "5ed5fd2beb9cd4370490258f",
      CLIENTS.web
    );
    const verifiedToken = await verifyToken(accessToken);
    expect(verifiedToken.exp).toBeCloseTo(
      Math.floor(Date.now() / 1000) + WEB_ACCESS_TOKEN_EXPIRATION,
      -3
    );
    expect(verifiedToken.iat).toBeDefined();
    expect(verifiedToken.tokenUse).toEqual("access");
    expect(verifiedToken.sub).toEqual("5ed5fd2beb9cd4370490258f");
  });
});
