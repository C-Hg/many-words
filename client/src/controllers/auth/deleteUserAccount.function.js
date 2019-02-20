async function deleteUserAccount() {
  return await new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `/auth/delete_user`, true);
    req.send();
    req.onload = function() {
      resolve(req.response);
    };
    req.onerror = function() {
      console.error("Error while trying to delete account");
      reject();
    };
  });
}

export default deleteUserAccount;
