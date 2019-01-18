async function updateWordStats(wordStats) {
  console.log(wordStats);
  new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("POST", `/api/tracking/update_word_stats`, true);
    req.send();
    req.onload = function() {
      resolve();
    };
    req.onerror = function() {
      console.error("Error while updating word stats");
      reject();
    };
  });
}

export default updateWordStats;
