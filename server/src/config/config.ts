const {
  JWT_SIGNATURE,
  MONGO_URI,
  NODE_ENV,
  SERVER_PORT,
  SSL_PATH,
} = process.env;

export enum ENVIRONMENTS {
  development = "development",
  staging = "staging",
  test = "test",
  production = "production",
}

const CONFIG = {
  env: NODE_ENV as ENVIRONMENTS,
  jwtSignature: JWT_SIGNATURE as string,
  mongoUri: MONGO_URI as string,
  serverPort: SERVER_PORT,
  sslPath: SSL_PATH as string,
};

// TODO: typeguards to replace as string
export default CONFIG;
