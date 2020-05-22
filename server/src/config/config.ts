const { JWT_SIGNATURE, MONGO_URI, NODE_ENV, SERVER_PORT } = process.env;

const CONFIG = {
  env: NODE_ENV,
  jwtSignature: JWT_SIGNATURE as string,
  mongoUri: MONGO_URI,
  serverPort: SERVER_PORT,
};

export default CONFIG;
