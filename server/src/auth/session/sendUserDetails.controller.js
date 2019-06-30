module.exports = function sendUserDetails(req, res) {
  if (req.user) {
    res.status(200).send(req.user.stats);
    return;
  } else {
    res.status(401).send("no active session");
    return;
  }
};
