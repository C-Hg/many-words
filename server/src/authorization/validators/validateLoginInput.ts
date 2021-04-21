import validator from "validator";

import { LoginInput } from "../../graphql/types";
import { AuthorizationErrors } from "../constants";

/**
 * Returns an explicit error if login input parameters are invalid
 */
const validateLoginInput = (
  loginInput: LoginInput
): AuthorizationErrors | undefined => {
  const { email, totp } = loginInput;
  if (!validator.isEmail(email)) {
    return AuthorizationErrors.invalidEmailFormat;
  }

  if (typeof totp !== "number" || totp.toString().length !== 6) {
    return AuthorizationErrors.invalidTotp;
  }
};

export default validateLoginInput;
