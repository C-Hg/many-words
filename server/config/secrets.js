// placeholders allow compiling without app secrets for social auth

module.exports = {
  SESSION_SECRET: process.env.SESSION_SECRET || "session_secret",

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "no_ID",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "no_secret",

  FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || "no_ID",
  FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || "no_secret",

  // mongo is the name of the docker image
  MONGO_URI: "mongodb://mongo:27017/many-words"
};

// `mongodb://${process.env.MONGO_USER}${
//       process.env.MONGO_PASSWORD
//     }@localhost:27017/many-words`
