import { UserInputError } from "apollo-server-express";

import validateEmail from "./validateEmail";

import { LoginInput } from "../../graphql/authorization.types";
import logger from "../../utils/logger";

/**
 * Throws an error if login input parameters are invalid
 */
const validateLoginInput = (loginInput: LoginInput): void => {
  const { email, totp } = loginInput;
  validateEmail(email);
  if (typeof totp !== "number" || totp.toString().length !== 6) {
    logger.error("[sendTotp] invalid totp format");
    throw new UserInputError("InvalidTotp");
  }
  logger.silly("[validateLoginInput] input validated");
};

export default validateLoginInput;
