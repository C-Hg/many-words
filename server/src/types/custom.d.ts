/**
 * Declare a custom context object to pass user
 * Cannot override Express user without being optional
 */

declare namespace Express {
  export interface Request {
    ctx: {
      user: import("../user/interfaces/user.interface").User;
    };
  }
}
