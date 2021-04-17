import validateLoginInput from "./validateLoginInput";

import { LoginInput } from "../../graphql/types";
import { AuthorizationErrors } from "../constants";

describe("validateLoginInput", () => {
  it("should throw an error if the given email is of invalid format", () => {
    const loginInput: LoginInput = {
      email: "invalid.email.fr",
      totp: 180057,
    };
    const error = validateLoginInput(loginInput);
    expect(error).toEqual(AuthorizationErrors.invalidEmailFormat);
  });

  it("should throw an error if the given totp is too long", () => {
    const loginInput: LoginInput = {
      email: "valid@email.fr",
      totp: 18005765,
    };
    const error = validateLoginInput(loginInput);
    expect(error).toEqual(AuthorizationErrors.invalidTotp);
  });
});
