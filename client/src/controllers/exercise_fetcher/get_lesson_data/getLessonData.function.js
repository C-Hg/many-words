async function getLessonData(lessonName) {
  let result = new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", `/api/exercise/${lessonName}`, true);
    req.send();
    req.onload = function() {
      resolve(JSON.parse(req.response));
    };
    req.onerror = function() {
      console.error("Error while fetching data for the lesson (API call)");
      reject();
    };
  });
  return await result;
}

export default getLessonData;
