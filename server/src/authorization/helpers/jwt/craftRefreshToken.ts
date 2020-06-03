import signToken from "./signToken";

import { REFRESH_TOKEN_EXPIRATION } from "../../constants";
import { TokenTypes } from "../../interfaces/tokenPayload.interface";

const craftRefreshToken = async (id: string): Promise<string> => {
  const exp = Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION;
  const payload = {
    exp,
    sub: id,
    tokenUse: TokenTypes.refresh,
  };
  return signToken(payload);
};

export default craftRefreshToken;
