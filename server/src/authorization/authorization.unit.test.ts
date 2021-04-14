import Mongoose from "mongoose";

// import User from "../user/models/user.model";
// import getDbConnection from "../utils/tests/dbConnection";

// let db: typeof Mongoose;

describe("Authorization - unit tests", () => {
  // beforeAll(async () => {
  //   db = await getDbConnection();
  // });

  // afterAll(async () => {
  //   // remove all users created to test the tokens, i.e. without emails
  //   await User.deleteMany({ email: { $exists: false } });
  //   await User.deleteMany({
  //     email: {
  //       $in: [VALID_EMAIL_1],
  //     },
  //   });
  //   await db.connection.close();
  // });

  // -----------------     SEND_TOTP     ------------------
  it("should have tests", () => {
    expect(true).toEqual(true);
  });
});
