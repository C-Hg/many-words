async function getWordsToLearn(lesson) {
  let result = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `/learn/${lesson}`, true);
    req.send();
    req.onload = function() {
      resolve(JSON.parse(req.response));
    };
    req.onerror = function() {
      console.error("Error while fetching words to learn (API call)");
      reject();
    };
  });
  return await result;
}

export default getWordsToLearn;
