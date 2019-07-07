import passport from "passport";
import User from "../../models/user.model";

const sessionMiddlewares = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      if (err) return err;
      done(err, user);
    });
  });
};

export default sessionMiddlewares;
