module.exports = function getThemesStats(req, res) {
  let user = req.user;
  if (user.themesStats === {}) {
    res.send(JSON.stringify({ response: "No data for this user" }));
    return;
  }
  res.send(JSON.stringify(user.themesStats));
};
