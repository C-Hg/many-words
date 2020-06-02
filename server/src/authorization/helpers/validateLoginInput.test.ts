import validateLoginInput from "./validateLoginInput";

import { LoginInput } from "../../graphql/authorization.types";

describe("validateLoginInput", () => {
  it("should throw an error if the given email is of invalid format", () => {
    const loginInput: LoginInput = {
      email: "invalid.email.fr",
      totp: 180057,
    };
    expect(() => validateLoginInput(loginInput)).toThrowError("InvalidEmail");
  });

  it("should throw an error if the given totp is too long", () => {
    const loginInput: LoginInput = {
      email: "valid@email.fr",
      totp: 18005765,
    };
    expect(() => validateLoginInput(loginInput)).toThrowError("InvalidTotp");
  });
});
