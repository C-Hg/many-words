import { UserInputError } from "apollo-server-express";
import validator from "validator";

import logger from "../../../utils/logger";

/**
 * Throws an error if email is invalid
 */
const validateEmail = (email: string): void => {
  if (!validator.isEmail(email)) {
    logger.error("[validateEmail] invalid email format");
    throw new UserInputError("InvalidEmailFormat");
  }
  logger.silly("[validateEmail] email format validated");
};

export default validateEmail;
