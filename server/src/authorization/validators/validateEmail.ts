import validator from "validator";

import logger from "../../utils/logger";
import { AuthorizationErrors } from "../constants";

/**
 * Returns an explicit error if login input parameters are invalid
 */
const validateEmail = (email: string): AuthorizationErrors | undefined => {
  if (!validator.isEmail(email)) {
    logger.error("[validateEmail] invalid email format");
    return AuthorizationErrors.invalidEmailFormat;
  }
  logger.silly("[validateEmail] email input validated");
};

export default validateEmail;
