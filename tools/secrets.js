const {
  NODE_ENV,
  MONGODB_PASSWORD,
  MONGODB_USER,
  MONGO_INITDB_DATABASE
} = process.env;

module.exports = {
  MONGO_URI:
    NODE_ENV === "production"
      ? `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@mongo:27017/${MONGO_INITDB_DATABASE}`
      : "mongodb://mongo:27017/many-words"
};
