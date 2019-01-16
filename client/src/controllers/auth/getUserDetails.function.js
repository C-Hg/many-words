async function getSessionDetails() {
  let result = new Promise((resolve, reject) => {
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
  return await result;
}

export default getSessionDetails;
