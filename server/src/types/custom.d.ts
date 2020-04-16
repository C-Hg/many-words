// overriding predefined user object (req.user)

declare namespace Express {
  export interface Request {
    user?: import("../graphql/types").User;
  }
}
