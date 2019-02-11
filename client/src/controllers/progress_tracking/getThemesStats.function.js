async function getThemesStats() {
  return await new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `/api/tracking/themes_stats`, true);
    req.send();
    req.onload = function() {
      resolve(JSON.parse(req.response));
    };
    req.onerror = function() {
      console.error("Error while getting themes stats");
      reject();
    };
  });
}

export default getThemesStats;
