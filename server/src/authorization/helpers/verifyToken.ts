import jwt from "jsonwebtoken";

import CONFIG from "../../config/secrets";
import { TOKEN_ISSUER } from "../constants";
import { TokenPayload } from "../interfaces/tokenPayload.interface";

const tokenConfiguration = {
  issuer: TOKEN_ISSUER,
};

const verifyToken = (token: string): Promise<TokenPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, CONFIG.jwtSignature, tokenConfiguration, function (
      error,
      decodedToken
    ) {
      if (decodedToken) {
        resolve(decodedToken as TokenPayload);
      } else {
        reject(error);
      }
    });
  });
};

export default verifyToken;
