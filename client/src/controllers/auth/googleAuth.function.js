// once the user is logged in on the front end, sends the accessToken to the back end
// for validation and start a permanent session with passport

async function googleAuth(token) {
  let result = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `/auth/google/token`, true);
    req.setRequestHeader("access_token", token);
    req.overrideMimeType("text/plain");
    req.send();
    req.onload = function() {
      resolve(req.response);
    };
    req.onerror = function() {
      console.error("Error while login on server with Google token");
      reject();
    };
  });
  return await result;
}

export default googleAuth;
