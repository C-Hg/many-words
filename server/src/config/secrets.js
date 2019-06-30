// placeholders allow compiling without app secrets for social auth
const {
  NODE_ENV,
  MONGODB_PASSWORD,
  MONGODB_USER,
  MONGO_INITDB_DATABASE,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SESSION_SECRET
} = process.env;

module.exports = {
  SESSION_SECRET: SESSION_SECRET || "session_secret",

  GOOGLE_CLIENT_ID: GOOGLE_CLIENT_ID || "no_ID",
  GOOGLE_CLIENT_SECRET: GOOGLE_CLIENT_SECRET || "no_secret",

  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "no_ID",
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || "no_secret",

  // mongo is the name of the docker image
  MONGO_URI:
    NODE_ENV === "production"
      ? `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@mongo:27017/${MONGO_INITDB_DATABASE}`
      : "mongodb://mongo:27017/many-words"
};
