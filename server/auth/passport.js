const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const secrets = require("../config/secrets");
const findOrCreateGoogleUser = require("../auth/google/findOrCreateGoogleUser.function");

module.exports = function() {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: secrets.GOOGLE_CLIENT_ID,
        clientSecret: secrets.GOOGLE_CLIENT_SECRET
      },
      async function(accessToken, refreshToken, profile, done) {
        let user = await findOrCreateGoogleUser(profile.id, profile.emails);
        return done(null, user);
      }
    )
  );
};
