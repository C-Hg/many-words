//session continues but the user is logged out i.e the session cookie contains no user ID

module.exports = function logoutUser(req, res) {
  if (req.user) {
    req.logout();
    req.session.destroy(function(err) {
      if (err) {
        console.log("error while destroying session");
      }
    });
    res.send("user logged out");
    return;
  } else res.send("no active session");
};
