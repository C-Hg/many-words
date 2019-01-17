const User = require("../../models/user.model");

module.exports = async function createUserWithGoogle(googleId, email) {
  try {
    let user = await User.create({ googleId: googleId, email: email });
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
