import validator from "validator";

import { LoginInput } from "../../graphql/authorization.types";
import logger from "../../utils/logger";

/**
 * Throws an error if login input parameters are invalid
 */
const validateLoginInput = (loginInput: LoginInput): void => {
  const { email, totp } = loginInput;
  logger.debug("[validateLoginInput] input validated");
  if (!validator.isEmail(email)) {
    logger.error("[sendTotp] invalid email format");
    throw new Error("InvalidEmail");
  }
  if (typeof totp !== "number" || totp.toString().length !== 6) {
    logger.error("[sendTotp] invalid totp format");
    throw new Error("InvalidTotp");
  }
};

export default validateLoginInput;
