async function updateWordStats(wordStats) {
  new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    let data = JSON.stringify(wordStats);
    req.open("POST", `/api/tracking/update_word_stats`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.send(data);
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
