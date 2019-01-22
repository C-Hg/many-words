async function getWordCount() {
  return await new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `/api/tracking/word_count`, true);
    req.send();
    req.onload = function() {
      resolve(JSON.parse(req.response));
    };
    req.onerror = function() {
      console.error("Error while updating word stats");
      reject();
    };
  });
}

export default getWordCount;
