import Mongoose from "mongoose";

import CONFIG from "../../config/config";
import logger from "../logger";

// TODO: use a specific mongo and server in a docker-compose test
const getDbConnection = async (): Promise<typeof Mongoose> => {
  return Mongoose.connect(
    CONFIG.mongoUri,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
    }
  );
};

export default getDbConnection;
