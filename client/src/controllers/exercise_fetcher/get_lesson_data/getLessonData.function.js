// async function getLessonData(lesson) {
//   return await new Promise((resolve, reject) => {
//     let req = new XMLHttpRequest();
//     req.open("GET", `/api/exercise/${lesson}`, true);
//     req.send();
//     req.onload = function() {
//       resolve(JSON.parse(req.response));
//     };
//     req.onerror = function() {
//       console.error("Error while fetching data for the lesson (API call)");
//       reject();
//     };
//   });
// }

// export default getLessonData;
