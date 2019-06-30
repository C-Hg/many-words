const deleteData = require("./deleteData.function");

module.exports = async function deleteUserAccount(req, res) {
  if (!req.user) {
    res.statusCode = 401;
    res.send("no active session");
  }
  let result = false;
  try {
    result = await deleteData(req.user.id);
  } catch (e) {
    console.log("error while deleting user data");
  }
  if (result) {
    req.logout();
    req.session.destroy(function(err) {
      if (err) {
        console.log("error while destroying session");
      }
    });
    res.send("user deleted and logged out");
    return;
  }
  res.statusCode = 500;
  res.send("error while deleting user data");
};
