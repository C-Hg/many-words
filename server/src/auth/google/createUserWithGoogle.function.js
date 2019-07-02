import User from "../../models/user.model";

const createUserWithGoogle = async (googleId, email) => {
  try {
    const user = await User.create({ googleId, email });
    await new Promise((resolve, reject) => {
      user.save(function handleCreate(err) {
        if (err) reject(err);
        resolve();
      });
    });
    return user;
  } catch (e) {
    console.log("error while registering user");
  }
};

export default createUserWithGoogle;
