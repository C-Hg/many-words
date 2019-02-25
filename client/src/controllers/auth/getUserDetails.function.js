async function getSessionDetails() {
  return await new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `/auth/session`, true);
    req.send();
    req.onload = function() {
      resolve(req.response);
    };
    req.onerror = function() {
      console.error("Error while fetching session details");
      reject();
    };
  });
}

export default getSessionDetails;
