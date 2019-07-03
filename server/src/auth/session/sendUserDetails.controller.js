const sendUserDetails = (req, res) => {
  if (req.user) {
    res.status(200).send(req.user.stats);
  } else {
    res.status(401).send("no active session");
  }
};

export default sendUserDetails;
