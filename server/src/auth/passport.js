import passport from "passport";
import GoogleTokenStrategy from "passport-google-token";
import FacebookTokenStrategy from "passport-facebook-token";
import findOrCreateGoogleUser from "./google/findOrCreateGoogleUser.controller";
import secrets from "../config/secrets";

const findOrCreateFacebookUser = require("./facebook/findOrCreateFacebookUser.controller");

module.exports = function() {
  passport.use(
    new GoogleTokenStrategy.Strategy(
      {
        clientID: secrets.GOOGLE_CLIENT_ID,
        clientSecret: secrets.GOOGLE_CLIENT_SECRET
      },
      async function(accessToken, refreshToken, profile, done) {
        const user = await findOrCreateGoogleUser(profile.id, profile.emails);
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
        const user = await findOrCreateFacebookUser(profile.id, profile.emails);
        return done(null, user);
      }
    )
  );
};
