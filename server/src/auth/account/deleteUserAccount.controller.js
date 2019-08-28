import deleteData from "./deleteData.function";

const deleteUserAccount = async (req, res) => {
  if (!req.user) {
    res.statusCode = 401;
    res.send("no active session");
  }
  let result = false;
  try {
    result = await deleteData(req.user.id);
  } catch (error) {
    console.error("[deleteUserAccount] error while deleting user data", error);
  }
  if (result) {
    req.logout();
    req.session.destroy(error => {
      if (error) {
        console.error(
          "[deleteUserAccount] error while destroying session",
          error
        );
      }
    });
    res.send("user deleted and logged out");
    return;
  }
  res.statusCode = 500;
  res.send("error while deleting user data");
};

export default deleteUserAccount;
