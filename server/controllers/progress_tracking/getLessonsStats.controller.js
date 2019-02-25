module.exports = function getLessonsStats(req, res) {
  let user = req.user;
  let lessonsStats;
  if (user.lessonsStats[req.params.theme]) {
    lessonsStats = user.lessonsStats[req.params.theme];
  } else lessonsStats = null;
  res.send(JSON.stringify(lessonsStats));
};
