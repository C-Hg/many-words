const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
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

  passport.use(
    new FacebookTokenStrategy(
      {
        clientID: secrets.FACEBOOK_APP_ID,
        clientSecret: secrets.FACEBOOK_APP_SECRET
      },
      function(accessToken, refreshToken, profile, done) {
        let user = await findOrCreateFacebookUser(profile.id, profile.email);
        return done(null, user);
      }
    )
  );
};
