// async function getLessonsStats(theme) {
//   return await new Promise((resolve, reject) => {
//     let req = new XMLHttpRequest();
//     req.open("GET", `/api/tracking/user_stats`, true);
//     req.send();
//     req.onload = function() {
//       resolve(JSON.parse(req.response));
//     };
//     req.onerror = function() {
//       console.error("Error while getting lessons stats");
//       reject();
//     };
//   });
// }

// export default getLessonsStats;
