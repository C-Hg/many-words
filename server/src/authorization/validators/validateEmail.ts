import validator from "validator";

import { AuthorizationErrors } from "../constants";

/**
 * Returns an explicit error if login input parameters are invalid
 */
const validateEmail = (email: string): AuthorizationErrors | undefined => {
  if (!validator.isEmail(email)) {
    return AuthorizationErrors.invalidEmailFormat;
  }
};

export default validateEmail;
