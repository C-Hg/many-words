import passport from "passport";
import User from "../../models/user.model";

module.exports = function() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      if (err) return err;
      done(err, user);
    });
  });
};
