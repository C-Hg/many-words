import jwt from "jsonwebtoken";

import CONFIG from "../../config/config";
import { TOKEN_ISSUER } from "../constants";
import { TokenPayload } from "../interfaces/tokenPayload.interface";

const signToken = (payload: Partial<TokenPayload>): Promise<string> => {
  const defaultPayload = {
    iss: TOKEN_ISSUER,
  };
  const fullPayload = { ...payload, ...defaultPayload };

  return new Promise((resolve, reject) => {
    jwt.sign(fullPayload, CONFIG.jwtSignature, function (error, token) {
      if (token) {
        resolve(token);
      } else {
        reject(error);
      }
    });
  });
};

export default signToken;
