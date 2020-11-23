/**
 * Declare a custom context object to pass user
 * Cannot override Express user without being optional
 */

import { TokenPayload } from "../authorization/interfaces/tokenPayload.interface";

declare global {
  namespace Express {
    export interface Request {
      ctx: {
        user: import("../user/interfaces/user.interface").User;
      };
      refreshToken?: TokenPayload;
    }
  }
}
