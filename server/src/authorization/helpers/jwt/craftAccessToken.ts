import signToken from "./signToken";

import {
  APP_ACCESS_TOKEN_EXPIRATION,
  CLIENTS,
  WEB_ACCESS_TOKEN_EXPIRATION,
} from "../../constants";
import { TokenTypes } from "../../interfaces/tokenPayload.interface";

/**
 * Craft a new access token for a given user, to use on web or app client
 */
const craftAccessToken = async (
  id: string,
  client: CLIENTS
): Promise<string> => {
  const expirationDelay =
    client === CLIENTS.app
      ? APP_ACCESS_TOKEN_EXPIRATION
      : WEB_ACCESS_TOKEN_EXPIRATION;
  const exp = Math.floor(Date.now() / 1000) + expirationDelay;
  const payload = {
    exp,
    sub: id,
    tokenUse: TokenTypes.access,
  };
  return signToken(payload);
};

export default craftAccessToken;
