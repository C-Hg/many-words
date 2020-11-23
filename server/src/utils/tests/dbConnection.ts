import Mongoose from "mongoose";

import CONFIG from "../../config/config";
import logger from "../logger";

const getDbConnection = async (): Promise<typeof Mongoose> => {
  return Mongoose.connect(
    CONFIG.mongoUri,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        logger.error(`Error in db connection ${err.message})`);
        process.exit(1);
      }
    }
  );
};

export default getDbConnection;
