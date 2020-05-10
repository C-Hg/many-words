// placeholders allow compiling without app secrets for social auth
const {
  JWT_SECRET,
  MONGODB_PASSWORD,
  MONGODB_USER,
  MONGO_INITDB_DATABASE,
  NODE_ENV,
  SERVER_PORT,
} = process.env;

const secrets = {
  JWT_SECRET,
  NODE_ENV,
  SERVER_PORT,

  // mongo is the name of the docker image
  MONGO_URI:
    NODE_ENV === "production"
      ? `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@mongo:27017/${MONGO_INITDB_DATABASE}`
      : "mongodb://mongo:27017/many-words",
};

export default secrets;
