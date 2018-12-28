async function getLessonData(lessonName) {
  let result = new Promise(resolve => {
    let req = new XMLHttpRequest();
    req.open("GET", `/exercises/${lessonName}`, true);
    req.send();
    req.onload = function() {
      resolve(JSON.parse(req.response));
    };
  });
  return await result;
}

export default getLessonData;
