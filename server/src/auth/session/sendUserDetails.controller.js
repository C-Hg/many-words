const sendUserDetails = (req, res) => {
  if (req.user) {
    res.status(200).send(req.user.stats);
  } else {
    res.status(200).send({ response: "user not connected" });
  }
};

export default sendUserDetails;
