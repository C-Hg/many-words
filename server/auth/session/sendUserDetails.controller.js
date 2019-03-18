module.exports = function sendUserDetails(req, res) {
  if (req.user) {
    const stats = {
      globalProgress: req.user.globalProgress,
      lessonsStats: req.user.lessonsStats,
      themesStats: req.user.themesStats
    };
    console.log(stats);
    res.status(200).send(stats);
    return;
  } else {
    res.status(401).send("no active session");
    return;
  }
};
