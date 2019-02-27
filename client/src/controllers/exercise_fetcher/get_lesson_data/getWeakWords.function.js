async function getWeakWords(context, reference) {
  let route = reference
    ? `/api/weak_words/${context}/${reference}`
    : `/api/weak_words/${context}`;
  return await new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", route, true);
    req.send();
    req.onload = function() {
      resolve(JSON.parse(req.response));
    };
    req.onerror = function() {
      console.error("Error while fetching data for the lesson (API call)");
      reject();
    };
  });
}

export default getWeakWords;
