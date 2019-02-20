const deleteData = require("./deleteData.function");

module.exports = async function deleteUserAccount(req, res) {
  if (!req.user) {
    res.send("no active session");
  }
  try {
    let clear = await deleteData(req.user._id);
  } catch (e) {
    console.log("error while trying to delete user data");
  }
  if (clear) {
    req.logout();
    req.session.destroy(function(err) {
      if (err) {
        console.log("error while destroying session");
      }
    });
    res.send("user deleted and logged out");
    return;
  }
};
