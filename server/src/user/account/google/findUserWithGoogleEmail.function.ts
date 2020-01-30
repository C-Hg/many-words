import User from "../../models/user.model";
import UserDocument from "../../models/user.interface";

// searches a match with every emails sent, if any
// Google sends an array of email adresses of the form :
// [{ value: email@adress }]

const findUserWithGoogleEmail = async (
  emails: string[]
): Promise<UserDocument> => {
  const arrayOfEmails = emails.map(email => email.value);
  let user;
  try {
    user = await User.findOne({ email: { $in: arrayOfEmails } });
  } catch (error) {
    console.error("[findUserWithEmail] error while checking db", error);
  }
  return user; // returns null if no match
};

export default findUserWithGoogleEmail;
