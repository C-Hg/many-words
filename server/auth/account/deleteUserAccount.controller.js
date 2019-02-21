const deleteData = require("./deleteData.function");

module.exports = async function deleteUserAccount(req, res) {
  if (!req.user) {
    res.send("no active session");
  }
  let result = false;
  try {
    result = await deleteData(req.user._id);
    console.log("deleteData result", result);
  } catch (e) {
    console.log(e);
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
};
