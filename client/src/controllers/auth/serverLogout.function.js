async function serverLogout() {
  return await new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `/auth/logout`, true);
    req.send();
    req.onload = function() {
      resolve(req.response);
    };
    req.onerror = function() {
      console.error("Error while trying to log out");
      reject();
    };
  });
}

export default serverLogout;
