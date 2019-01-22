const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const secrets = require("../config/secrets");

const findOrCreateGoogleUser = require("./google/findOrCreateGoogleUser.controller");
const findOrCreateFacebookUser = require("../auth/facebook/findOrCreateFacebookUser.controller");

module.exports = function() {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: secrets.GOOGLE_CLIENT_ID,
        clientSecret: secrets.GOOGLE_CLIENT_SECRET
      },
      async function(accessToken, refreshToken, profile, done) {
        console.log("hello from server");
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
      async function(accessToken, refreshToken, profile, done) {
        let user = await findOrCreateFacebookUser(profile.id, profile.emails);
        return done(null, user);
      }
    )
  );
};
