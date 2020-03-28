import passport from "passport";
import GoogleTokenStrategy from "passport-google-token";

import findOrCreateGoogleUser from "../user/account/google/findOrCreateGoogleUser.controller";
import secrets from "../config/secrets";

const passportStrategies = () => {
  passport.use(
    new GoogleTokenStrategy.Strategy(
      {
        clientID: secrets.GOOGLE_CLIENT_ID,
        clientSecret: secrets.GOOGLE_CLIENT_SECRET,
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = await findOrCreateGoogleUser(profile.id, profile.emails);
        return done(null, user);
      }
    )
  );
};

export default passportStrategies;
