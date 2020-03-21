import passport from "passport";
import User from "../user/models/user.model";
import UserDocument from "../user/models/user.interface";

const sessionMiddlewares = (): void => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user: UserDocument) => {
      if (err) return err;
      done(err, user);
    });
  });
};

export default sessionMiddlewares;