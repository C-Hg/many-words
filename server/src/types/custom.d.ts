/**
 * Declare a custom context object to pass user
 * Cannot override Express user without being optional
 */

// declare global {  // uncomment if this becomes a module
declare namespace Express {
  export interface Request {
    ctx: {
      user: import("../user/interfaces/user.interface").User;
    };
  }
}
// }
