const {
  MONGODB_PASSWORD,
  MONGODB_USER,
  MONGO_INITDB_DATABASE,
  NODE_ENV,
} = process.env;

const CONFIG = {
  jwtSignature: process.env.JWT_SIGNATURE as string,
  serverPort: process.env.SERVER_PORT,
  env: process.env.NODE_ENV,

  // mongo is the name of the docker image
  mongoUri:
    NODE_ENV === "production"
      ? `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@mongo:27017/${MONGO_INITDB_DATABASE}`
      : "mongodb://mongo:27017/many-words",
};

export default CONFIG;
