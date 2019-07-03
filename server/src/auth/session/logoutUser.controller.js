// session continues but the user is logged out i.e the session cookie contains no user ID

const logoutUser = (req, res) => {
  if (req.user) {
    req.logout();
    req.session.destroy(error => {
      if (error) {
        console.error("error while destroying session", error);
      }
    });
    res.status(200).send("user logged out");
  } else {
    res.status(401).send("no active session");
  }
};

export default logoutUser;
