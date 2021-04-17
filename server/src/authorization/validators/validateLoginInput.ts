import validator from "validator";

import { LoginInput } from "../../graphql/types";
import logger from "../../utils/logger";
import { AuthorizationErrors } from "../constants";

/**
 * Returns an explicit error if login input parameters are invalid
 */
const validateLoginInput = (
  loginInput: LoginInput
): AuthorizationErrors | undefined => {
  const { email, totp } = loginInput;
  if (!validator.isEmail(email)) {
    logger.error("[validateEmail] invalid email format");
    return AuthorizationErrors.invalidEmailFormat;
  }

  if (typeof totp !== "number" || totp.toString().length !== 6) {
    logger.error("[sendTotp] invalid totp format");
    return AuthorizationErrors.invalidTotp;
  }
  logger.silly("[validateLoginInput] login input validated");
};

export default validateLoginInput;
