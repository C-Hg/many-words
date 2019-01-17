async function facebookAuth(accessToken) {
  let result = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `/auth/facebook/token`, true);
    req.setRequestHeader("access_token", accessToken);
    req.overrideMimeType("text/plain");
    req.send();
    req.onload = function() {
      resolve(req.response);
    };
    req.onerror = function() {
      console.error("Error while login on server with Facebook token");
      reject();
    };
  });
  return await result;
}

export default facebookAuth;
