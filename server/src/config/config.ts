const { JWT_SIGNATURE, MONGO_URI, NODE_ENV, SERVER_PORT } = process.env;

const CONFIG = {
  env: NODE_ENV,
  jwtSignature: JWT_SIGNATURE as string,
  mongoUri: MONGO_URI as string,
  serverPort: SERVER_PORT,
};

// TODO: typeguards to replace as string
export default CONFIG;
