//placeholder allow compiling without app secrets for social auth

module.exports = {
  SESSION_SECRET: process.env.SESSION_SECRET || "session_secret",

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "no_ID",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "no_secret",

  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "no_ID",
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || "no_secret",

  MONGO_URI: "mongodb://localhost/many-words"
};
