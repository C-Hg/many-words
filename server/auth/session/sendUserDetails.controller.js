module.exports = function sendUserDetails(req, res) {
  if (req.user) {
    res.send(req.user._id);
    return;
  } else {
    res.send("no active session");
    return;
  }
};
